var Discord = require('discord.js');
var Levels = require('discord-xp');

module.exports = {
  name: 'rank',
  async execute(client, message, args) {

    var target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    var user = await Levels.fetch(target.user.id, message.guild.id);

    if(!user) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> This user does not have any levels within this server`)
      return message.reply({ embeds: [embed] })
    }

    var embed = new Discord.MessageEmbed()
      .setTitle(`${target.user.tag}:`)
      .addField(`Level:`, `${user.level}`, true)
      .addField(`Total Xp:`, `${user.xp}`, true)
      .addField(`Xp till level up:`, `${user.xp}/${Levels.xpFor(user.level + 1)}`, false)
      .setThumbnail(target.displayAvatarURL({ dynamic: false }))
      .setTimestamp()
    await message.reply({ embeds: [embed] })
  }
}
