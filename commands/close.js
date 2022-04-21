var Discord = require('discord.js');
var ticketSchema = require('../schemas/ticket');
var mongo = require('../mongo');

module.exports = {
  name: 'close',
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
          if(!ticket) {
            var embed = new Discord.MessageEmbed()
              .setDescription(`<:cancel:960946118521405511> You already don't have a ticket open`)
            await message.reply({ embeds: [embed] })
          } else {
            var c = message.guild.channels.cache.get('960311041647079545')
            var channel = message.guild.channels.cache.get(ticket.ticketId)
            await channel.delete()
            await ticketSchema.findOneAndDelete({
              guildId: message.guild.id,
              userId: message.author.id
            })
            try {
              var embed = new Discord.MessageEmbed()
                .setDescription(`<:success:961096354283790356> I have closed your ticket`)
              await message.reply({ embeds: [embed] })
            } catch (e) {
              return;
            }
            var embed1 = new Discord.MessageEmbed()
              .setTitle(`Ticket Closed:`)
              .setDescription(`<:heartKey:961990022679121991> User: ${message.author.tag} [${message.author.id}] \n<:loading:962369863744094298> TicketID: ${ticket.ticketId} \n<:loading:962369863744094298> Force: <:cancel:960946118521405511>`)
            await c.send({ embeds: [embed1] })
          }
        } finally {
          mongoose.connection.close()
        }
      })
    } catch (e) {
      console.log(e)
      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> An internal error occured while attempting to follow your request. Please contact <@783373105094721597>!`)
      await message.reply({ embeds: [embed] })
    }
  },
};
