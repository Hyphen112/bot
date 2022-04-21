var { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  async execute(client, message, args) {

    if(!args[0]) {

      let embed = new MessageEmbed()
        .setTitle(`${message.guild.name}`)
        .addField(`fun`, "`avatar` `banner` `hug` `kiss` `slap` `spotify` `status`", false)
        .addField(`utility`, "`afk` `serverinfo` `help` `ping` `rank` `snipe` `esnipe`", false)
        .addField(`staff`, "`cnotes` `cwarns` `note` `notes` `warn` `warns`", false)
  
      if(message.guild.id === '955237718055591976') {
        embed.addField(`tickets`, "`close` `open`")
      }
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'avatar') {

      var embed = new MessageEmbed()
        .setTitle(`Avatar - Help`)
        .setDescription(`<:heartKey:961990022679121991> Gives you the ability to view a user's avatar \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'banner') {

      var embed = new MessageEmbed()
        .setTitle(`Banner - Help`)
        .setDescription(`<:heartKey:961990022679121991> Gives you the ability to view a user's banner (assuming they have one) \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'close') {
      var embed = new MessageEmbed()
        .setTitle(`CloseTicket - Help`)
        .setDescription(`<:heartKey:961990022679121991> Exclusive to [Kosame](https://discord.gg/3Gf7RYH6gc); allows a user to close a ticket (assuming they have one open) \n<:loading:962369863744094298> Slash Command: <:cancel:960946118521405511>  \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'cnotes') {
      var embed = new MessageEmbed()
        .setTitle(`ClearNotes - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows a staff member with the \`Manage_Messages\` permission to clear a user's notes (assuming they have any) \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356>  \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'cwarns') {
      var embed = new MessageEmbed()
        .setTitle(`CloseTicket - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows a staff member with the \`Manage_Messages\` permission to clear a user's warns (assuming they have any) \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356>  \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(['editsnipe', 'esnipe'].includes(args[0])) {

      var embed = new MessageEmbed()
        .setTitle(`EditSnipe - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to view this server's last edited message \n<:loading:962369863744094298> Slash Command: <:cancel:960946118521405511>  \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'help') {

      var embed = new MessageEmbed()
        .setTitle(`Help - Help`)
        .setDescription(`<:heartKey:961990022679121991> If no command given, allows you to view ${client.user.username}'s commands \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'hentai') {

      var embed = new MessageEmbed()
        .setTitle(`Hentai - Help | NSFW ⚠`)
        .setDescription(`<:heartKey:961990022679121991> Displays a hentai GIF; can only be executed in a channel labeled as \`Age Restricted\` \n<:loading:962369863744094298> Slash Command: <:cancel:960946118521405511> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'hug') {

      var embed = new MessageEmbed()
        .setTitle(`Hug - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to hug another user \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'kiss') {

      var embed = new MessageEmbed()
        .setTitle(`Kiss - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to kiss another user \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'leaderboard') {

      var embed = new MessageEmbed()
        .setTitle(`Leaderboard - Help`)
        .setDescription(`<:heartKey:961990022679121991> Displays this server's leveling system leaderboard \n<:loading:962369863744094298> Slash Command: <:cancel:960946118521405511> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'note') {

      var embed = new MessageEmbed()
        .setTitle(`Note - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows a staff member with the \`Manage_Messages\` to set a note on a user \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'notes') {

      var embed = new MessageEmbed()
        .setTitle(`Notes - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows a staff member with the \`Manage_Messages\` permission to view a user's notes  \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'open') {

      var embed = new MessageEmbed()
        .setTitle(`Open - Help`)
        .setDescription(`<:heartKey:961990022679121991> Exclusive to [Kosame](https://discord.gg/3Gf7RYH6gc); allows a user to open a ticket (assuming they don't already have one open) \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'ping') {

      var embed = new MessageEmbed()
        .setTitle(`Ping - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to view ${client.user.username}'s latency x uptime \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'rank') {

      var embed = new MessageEmbed()
        .setTitle(`Rank - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to view your own rank \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'sclose') {

      var embed = new MessageEmbed()
        .setTitle(`StaffCloseTicket - Help`)
        .setDescription(`<:heartKey:961990022679121991> Exclusive to [Kosame](https://discord.gg/3Gf7RYH6gc); allows a staff member with the \`Manage_Messages\` permission to forcefully close a ticket (assuming they have one open) \n<:loading:962369863744094298> Slash Command: <:cancel:960946118521405511>  \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'serverinfo') {

      var embed = new MessageEmbed()
        .setTitle(`Serverinfo - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to view basic info on ${message.guild.name} \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'slap') {

      var embed = new MessageEmbed()
        .setTitle(`Slap - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to slap another user \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'snipe') {

      var embed = new MessageEmbed()
        .setTitle(`Snipe - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to view this server's last deleted message \n<:loading:962369863744094298> Slash Command: <:cancel:960946118521405511> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'status') {

      var embed = new MessageEmbed()
        .setTitle(`Status - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to view a user's custom status \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'warn') {

      var embed = new MessageEmbed()
        .setTitle(`Warn - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows a staff member with the \`Manage_Messages\` permission to warn a user and have ${client.user.username} DM the user about their warn \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'warns') {

      var embed = new MessageEmbed()
        .setTitle(`Warns - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows a staff member with the \`Manage_Messages\` permission to view a user's warns \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:success:961096354283790356>`)
      return await message.reply({ embeds: [embed] })
    }

    if(args[0] === 'afk') {

      var embed = new MessageEmbed()
        .setTitle(`AFK - Help`)
        .setDescription(`<:heartKey:961990022679121991> Allows you to go AFK with a reason or without \n<:loading:962369863744094298> Slash Command: <:success:961096354283790356> \n<:loading:962369863744094298> Prefix Command: <:cancel:960946118521405511>`)
      return await message.reply({ embeds: [embed] })
    }
  },
};
