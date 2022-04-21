var Discord = require('discord.js');

module.exports = {
  name: 'serverinfo',
  async execute(client, message, args) {

    var embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name}:`)
      .setDescription(`owner: ${client.users.cache.get('402711280189964298').tag} \n<:blank:914734776374681670> id: ${client.users.cache.get('402711280189964298').id} \nmembers: ${message.guild.members.cache.size} \n<:blank:914734776374681670> bots: ${message.guild.members.cache.filter(m => m.user.bot).size} \n<:blank:914734776374681670> users: ${message.guild.members.cache.filter(m => !m.user.bot).size}`)
      .setThumbnail(message.guild.iconURL({ dynamic: false }))
      .setTimestamp()
    await message.reply({ embeds: [embed] })
  }
}
