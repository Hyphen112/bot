var Discord = require('discord.js');
var noteSchema = require('../schemas/notes');
var mongo = require('../mongo');

module.exports = {
  name: 'note',
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

    var note = message.content.split(' ').slice(2).join(' ');

    if(!note) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> Please specify a note to add.`)
      await message.reply({ embeds: [embed] })
    }
    
    try {

      var notes = {
        author: message.author.id,
        note: note,
        timestamp: Math.round(message.createdTimestamp / 1000)
      }

      await mongo().then(async mongoose => {

        try {

          await noteSchema.findOneAndUpdate({
            guildId: message.guild.id,
            userId: target.user.id
          }, {
            $push: {
              notes: notes
            }
          }, {
            upsert: true
          })
          
          var embed = new Discord.MessageEmbed()
            .setDescription(`<:success:961096354283790356> A note for the user ${target.user} has been added. \n<:heartKey:961990022679121991> Note: ${note}`)
          await message.reply({ embeds: [embed] })
        } finally {
          mongoose.connection.close()
        }
      })
    } catch (e) {
      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> An internal error occured while attempting to follow your request. Please contact <@783373105094721597>!`)
      await message.reply({ embeds: [embed] })
    }
  },
};
