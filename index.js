var Discord = require('discord.js');
var client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MEMBERS
  ]
});
var fs = require('fs');
var { prefix } = require('./config.json');
require('./mongo');

client.once('ready', async () => {
  console.log(`${client.user.username} is ready!`)
  var s = client.guilds.cache.get(`955237718055591976`).name
  await client.user.setActivity(`${s}`, {
    type: "STREAMING",
    url: "https://www.twitch.tv/ninja"
  });
  client.guilds.cache.forEach(g => {
    console.log(`${g.name} | ${g.id}`)
  })
});

client.commands = new Discord.Collection()
var commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (var file of commandFiles) {
  var command = require(`./commands/${file}`);
  client.commands.set(command.name, command)
}

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  var args = message.content.slice(prefix.length).trim().split(/ +/);
  var commandName = args.shift().toLowerCase()

  if (!client.commands.has(commandName)) return;
  var command = client.commands.get(commandName);
  try {
    command.execute(client, message, args)
  } catch (error) {
    console.error(error)
    return message.channel.send(`An Unexpected Error has occured!`)
  }
})

client.slashCommands = new Discord.Collection();

const cmdFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));

for (const file of cmdFiles) {
	const command = require(`./slash/${file}`);
	client.slashCommands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
    const command = client.slashCommands.get(interaction.commandName);
  	if (!command) return;
  
  	try {
  		await command.execute(client, interaction);
  	} catch (error) {
  		console.error(error);
  		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  	}
  }
});

const Levels = require('discord-xp')
Levels.setURL(process.env['mongoPath'])

client.on('messageCreate', async message => {
  if(message.author.bot) return
  if(message.channel.type == 'dm') return;

  const randomXp = Math.floor(Math.random() * 29) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
})

var mongo = require('./mongo');
var afkSchema = require('./schemas/afks');

client.on('messageCreate', async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  try {
    await mongo().then(async mongoose => {

    let afk = await afkSchema.findOne({ guildId: message.guild.id, userId: message.author.id })
    if(afk) {

      await afkSchema.findOneAndDelete({ guildId: message.guild.id, userId: message.author.id })
      var embed = new Discord.MessageEmbed()
        .setDescription(`<:heartKey:961990022679121991> You are no longer afk \n<:loading:962369863744094298> You went AFK <t:${afk.timestamp}:R>`)
      return await message.reply({ embeds: [embed] })
    }
    })
  } catch (e) {
    return
  }
})

client.on('messageCreate', async message => {
  if(message.author.bot) return;

  var target = message.mentions.users.first()

  if(target) {

    try {

      await mongo().then(async mongoose => {

        try {

          var afk = await afkSchema.findOne({ guildId: message.guild.id, userId: target.id })
    
          if(afk) {
    
            var embed = new Discord.MessageEmbed()
              .setDescription(`<:cancel:960946118521405511> ${target.tag} is currently afk \n<:heartKey:961990022679121991> Reason: ${afk.reason} \n<:loading:962369863744094298> They went AFK <t:${afk.timestamp}:R>`)
            return await message.reply({ embeds: [embed] })
          }
        } finally {
          mongoose.connection.close()
        }
      })
    } catch (e) {
      console.log(e)
      return;
    }
  }
})

var snipeSchema = require('./schemas/snipes');

client.on('messageDelete', async message => {
  if(message.author.bot) return;
  try {
    await mongo().then(async mongoose => {
      try {
        await snipeSchema.findOneAndUpdate({
          guildId: message.guild.id,
        }, {
          authorTag: message.author.tag,
          authorId: message.author.id,
          content: message.content
        }, {
          upsert: true
        })
      } finally {
        mongoose.connection.close()
      }
    })
  } catch (e) {
    console.log(e)
    return;
  }
});

var eSnipeSchema = require('./schemas/editsnipes');
client.on('messageUpdate', async (unedited, edited) => {
  if(unedited.author.bot) return;
  try {

    await mongo().then(async mongoose => {

      try {

        await eSnipeSchema.findOneAndUpdate({
          guildId: unedited.guild.id
        }, {
          authorTag: edited.author.tag,
          authorId: edited.author.id,
          unedited: unedited.content,
          edited: edited.content
        }, {
          upsert: true
        })
        
      } finally {
        mongoose.connection.close()
      }
      
    })
  } catch (e) {
    return;
  }
})

var prefixSchema = require('./schemas/prefixes');
client.on('guildCreate', async guild => {
  try {
    await mongo().then(async mongoose => {
      try {
        await prefixSchema.findOneAndUpdate({
          guildId: guild.id
        }, {
          prefix: ';'
        }, {
          upsert: true
        })
      } finally {
        mongoose.connection.close()
      }
    })
  } catch (e) {
    console.log(e)
    return;
  }
})

client.on('guildMemberAdd', async member => {
  try {
    var channel = member.guild.channels.cache.get('955237718055591979')
    var embed = new Discord.MessageEmbed()
      .setThumbnail(`https://images-ext-1.discordapp.net/external/GCduKw3UBYLs7iROtrF8WhAQ9uRUBNrhYOsEKvfxqnk/%3Fwidth%3D378%26height%3D357/https/media.discordapp.net/attachments/869954418337017876/884924164719411220/5a070f1b9ca101f3311ac32ad5ce99ab.jpg`)
      .setDescription(`<#955248839399465000> \n<#955565373783150652> \n<#955565489722126356>`)
      .setTitle(`${member.user.tag}:`)
      .setFooter({ text: `${member.guild.members.cache.size}` })
    await channel.send({ content: `${member} x <@&959617243241652294>`, embeds: [embed] })
  } catch (e) {
    return;
  }
})

client.login(process.env.TOKEN);
