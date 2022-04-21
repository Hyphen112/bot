var Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  async execute(client, message, args) {
    
    var user = message.mentions.users.first() || message.author;
    var embed = new Discord.MessageEmbed()
      .setTitle(`${user.tag}:`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512, type: 'png' }))
    await message.reply({ embeds: [embed] })
    
  },
};
