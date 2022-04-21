var Discord = require('discord.js');
var ticketSchema = require('../schemas/ticket');
var mongo = require('../mongo');

module.exports = {
  name: 'open',
  async execute(client, message, args) {

    if(message.guild.id !== '955237718055591976') {

      var row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setStyle('LINK')
            .setURL(`https://discord.gg/3Gf7RYH6gc`)
            .setLabel(`Join Kosame`)
        )

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> This command can only be ran in the [Kosame](https://discord.gg/3Gf7RYH6gc) server`)
      return await message.reply({ embeds: [embed], components: [row] })
    }

    try {

      await mongo().then(async mongoose => {

        try {

          var ticket = await ticketSchema.findOne({
            guildId: message.guild.id,
            userId: message.author.id
          })

          if(ticket) {

            var embed = new Discord.MessageEmbed()
              .setDescription(`<:cancel:960946118521405511> You already have a ticket open`)
            await message.reply({ embeds: [embed] })
          } else {

            let channel = await message.guild.channels.create(`e-${message.author.username}`, {
              type: 'text',
              permissionOverwrites: [
                {
                  id: message.author.id,
                  allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                  id: message.guild.id,
                  deny: ['VIEW_CHANNEL']
                }
              ],
              parent: '963969596489093161'
            })

            await ticketSchema.findOneAndUpdate({
              guildId: message.guild.id
            }, {
              userId: message.author.id,
              ticketId: channel.id
            }, {
              upsert: true
            })

            var embed = new Discord.MessageEmbed()
              .setDescription(`<:success:961096354283790356> I have opened a ticket for you [<#${channel.id}>]`)
            await message.reply({ embeds: [embed] })

            var e = new Discord.MessageEmbed()
              .setDescription(`**New Ticket Opened** \n<:heartKey:961990022679121991> A new ticket was opened just now by ${message.author}`)
            await channel.send({ content: `${message.author} x <@&955241725750825010>`, embeds: [e] })
          }
        } finally {
          mongoose.connection.close()
        }
      })
    } catch (e) {
      console.log(e)
      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> An internal error occured while attempting to follow your request. Please contact <@783373105094721597>!`)
      await message.reply({ embeds: [embed ]})
    }
  }
}
