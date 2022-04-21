var Discord = require('discord.js');

module.exports = {
  name: 'status',
  async execute(client, message, args) {

    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    var status = target.presence?.activities.find((a) => a.type === 'CUSTOM')

    if(!status) {

      var embed = new Discord.MessageEmbed()
      .setDescription(`<:cancel:960946118521405511> This user does not have a status`)
      await message.reply({ embeds: [embed] })
    } else {

      var embed = new Discord.MessageEmbed()
      .setDescription(`**${target.user.username}'s status:** \n<:blank:914734776374681670> ${status.state}`)
  
      await message.reply({ embeds: [embed] })
    }
  }
}
