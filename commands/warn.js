var Discord = require('discord.js');
var warnSchema = require('../schemas/warns');
var mongo = require('../mongo');

module.exports = {
  name: 'warn',
  async execute(client, message, args) {

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> You do not have permission to execute this command.`)
      return await message.reply({ embeds: [embed] })
    }

    var target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    var reason = message.content.split(' ').slice(2).join(' ') || `No reason provided`

    if(!target) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> Please specify a user.`)
      return await message.reply({ embeds: [embed] })
    }

    var warning = {
      author: message.author.id,
      reason,
      timestamp: Math.round(message.createdTimestamp / 1000)
    }

    try {
      await mongo().then(async mongoose => {
        try {

          await warnSchema.findOneAndUpdate({
            guildId: message.guild.id,
            userId: target.user.id
          }, {
            guildId: message.guild.id,
            userId: target.user.id,
            $push: {
              warnings: warning
            }
          }, {
            upsert: true
          })          
        } finally {
          mongoose.connection.close()
        }
      })

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:success:961096354283790356> ${target.user.tag} has been warned! \n<:heartKey:961990022679121991> Reason: ${reason}`)
      await message.reply({ embeds: [embed] })

      try {
        var embed1 = new Discord.MessageEmbed()
          .setDescription(`**You were warned in ${message.guild.name}** \n<:heartKey:961990022679121991> Reason: ${reason} \n<:staff:962080761513660426> Executor: ${message.author.tag}`)
          .setFooter({ text: `Do not question a staff's warn. Doing so will result in another warn` })
        target.send({ embeds: [embed1] })
      } catch (e) {
        return;
      }

    } catch (e) {
      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> An internal error occured while attempting to follow your request. Please contact <@783373105094721597>!`)
      return message.reply({ embeds: [embed], ephemeral: true })
    }
  },
};
