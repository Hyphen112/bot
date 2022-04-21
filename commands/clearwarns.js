var Discord = require('discord.js');
var warnsSchema = require('../schemas/notes');
var mongo = require('../mongo');

module.exports = {
  name: 'cwarns',
  async execute(client, message, args) {

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> You do not have permission to execute this command.`)
      return await message.reply({ embeds: [embed] })
    }

    var target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(!target) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> Please specify a user.`)
      return await message.reply({ embeds: [embed] })
    }

    try {

      await mongo().then(async mongoose => {

        try {

          var warn = warnsSchema.findOne({ guildId: message.guild.id, userId: target.user.id })
          if(!warn) {

            var embed = new Discord.MessageEmbed()
              .setDescription(`<:cancel:960946118521405511> This user doesn't have any warns`)
            await message.reply({ embeds: [embed] })
          } else {

            await warnsSchema.findOneAndDelete({
              guildId: message.guild.id,
              userId: target.user.id
            })
  
            var embed = new Discord.MessageEmbed()
              .setDescription(`<:success:961096354283790356> I have cleared this user's warns`)
            await message.reply({ embeds: [embed] })
          }
        } finally {
          mongoose.connection.close()
        }
      })
      
    } catch (e) {
      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> An internal error occured while attempting to follow your request. Please contact <@783373105094721597>!`)
      await message.reply({ embeds: [embed] })
    }
  }
}
