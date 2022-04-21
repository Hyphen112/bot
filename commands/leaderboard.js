var Levels = require('discord-xp');
var Discord = require('discord.js');

module.exports = {
  name: 'leaderboard',
  async execute(client, message, args) {

    var rawLB = await Levels.fetchLeaderboard(message.guild.id, 10);

    if(rawLB.length < 1) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> This guild does not have any levels.`)
      return await message.reply({ embeds: [embed] })
    }

    var leaderboard = await Levels.computeLeaderboard(client, rawLB, true);
    var lb = leaderboard.map(r => `${r.position}. ${r.username}#${r.discriminator} \n<:arrow:965051845829595136> Level: ${r.level} \n<:heartKey:961990022679121991> XP: ${r.xp.toLocaleString()}`)

    var embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name}:`)
      .setDescription(lb.join(`\n\n`))
      .setThumbnail(message.guild.iconURL({ dynamic: false, type: 'png' }))
    await message.reply({ embeds: [embed] })
  },
};
