const Discord = require('discord.js');
const mongo = require('../mongo');
const warnSchema = require('../schemas/warns');

module.exports = {
	name: 'warns',
	async execute(client, message, args) {

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> You do not have permission to execute this command.`)
      return await message.reply({ embeds: [embed] })
    }
    
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const guildId = message.guild.id
    const userId = target.user.id

    try {

      await mongo().then(async mongoose => {
        try {
          const results = await warnSchema.findOne({
            guildId,
            userId
          })
  
          if(!results) {
  
            const embed = new Discord.MessageEmbed()
            .setDescription(`<:cancel:960946118521405511> This user does not have any warns in this server.`)
            await message.reply({ embeds: [embed] })
          } else {
          
            let reply = ''
  
            for(const warning of results.warnings) {
              const { author, timestamp, reason } = warning
  
              reply += `<:staff:962080761513660426> Moderator: <@${author}> \n<:loading:962369863744094298> Date: <t:${timestamp}> \n<:heartKey:961990022679121991> Reason: ${reason} \n\n`
            }
            const embed = new Discord.MessageEmbed()
              .setTitle(`Warns for ${target.user.tag}:`)
              .setDescription(reply)
              .setThumbnail(target.user.displayAvatarURL({ dynamic: false }))
            await message.reply({ embeds: [embed] })
          }
        } finally {
          mongoose.connection.close()
        }
      })
    } catch (e) {
      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> An internal error occured while attempting to follow your request. Please contact <@783373105094721597>!`)
      return message.reply({ embeds: [embed], ephemeral: true })
    }
	},
};
