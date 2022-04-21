var Discord = require('discord.js');
var noteSchema = require('../schemas/notes');
var mongo = require('../mongo');

module.exports = {
  name: 'notes',
  async execute(client, message, args) {

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> You do not have permission to execute this command.`)
      return await message.reply({ embeds: [embed] })
    }
    
    var target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    try {

      await mongo().then(async mongoose => {

        try {

          const results = await noteSchema.findOne({
            guildId: message.guild.id,
            userId: target.user.id
          })
  
          if(!results) {
  
            const embed = new Discord.MessageEmbed()
            .setDescription(`<:cancel:960946118521405511> This user does not have any notes in this server.`)
            await message.reply({ embeds: [embed] })
          } else {
          
            let reply = ''
  
            for(const notes of results.notes) {
              const { author, timestamp, note } = notes
  
              reply += `<:staff:962080761513660426> Moderator: <@${author}> \n<:loading:962369863744094298> Date: <t:${timestamp}> \n<:heartKey:961990022679121991> Note: ${note} \n\n`
            }
            const embed = new Discord.MessageEmbed()
              .setTitle(`Notes for ${target.tag}:`)
              .setDescription(reply)
              .setThumbnail(target.displayAvatarURL({ dynamic: false }))
            await message.reply({ embeds: [embed] })
          }
          
        } finally {
          mongoose.connection.close()
        }
      })
    } catch {
      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> An internal error occured while attempting to follow your request. Please contact <@783373105094721597>!`)
      await message.reply({ embeds: [embed] })
    }
  }
}
