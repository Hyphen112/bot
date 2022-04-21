var snipeSchema = require('../schemas/snipes');
var Discord = require('discord.js');
var mongo = require('../mongo');

module.exports = {
  name: 'snipe',
  async execute(client, message, args) {

    try {

      await mongo().then(async mongoose => {

        try {
  
          var snipe = await snipeSchema.findOne({ guildId: message.guild.id });
    
          if(!snipe) {
            var embed = new Discord.MessageEmbed()
              .setDescription(`<:cancel:960946118521405511> This server does not have any messages to snipe`)
            return await message.reply({ embeds: [embed] })
          }

          var embed = new Discord.MessageEmbed()
            .setDescription(`**${message.guild.name}'s last deleted message:** \n<:heartKey:961990022679121991> Author: ${snipe.authorTag} [${snipe.authorId}] \n<:loading:962369863744094298> Content: ${snipe.content}`)
          await message.reply({ embeds: [embed] })
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
