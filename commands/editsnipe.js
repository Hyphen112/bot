var Discord = require('discord.js');
var eSnipeSchema = require('../schemas/editsnipes');
var mongo = require('../mongo');

module.exports = {
  name: 'esnipe',
  async execute(client, message, args) {

    try {

      await mongo().then(async mongoose => {

        try {

          var eSnipe = await eSnipeSchema.findOne({ guildId: message.guild.id })

          if(!eSnipe) {
            var embed = new Discord.MessageEmbed()
              .setDescription(`<:cancel:960946118521405511> This server does not have any recently edited messages`)
            return await message.reply({ embeds: [embed] })
          }

          var embed = new Discord.MessageEmbed()
            .setDescription(`**${message.guild.name}'s most recently edited message:** \n<:heartKey:961990022679121991> Author: ${eSnipe.authorTag} [${eSnipe.authorId}] \n<:loading:962369863744094298> Unedited: ${eSnipe.unedited} \n<:loading:962369863744094298> Edited: ${eSnipe.edited}`)
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
