var Discord = require('discord.js');
var love = require('discord_love');

module.exports = {
  name: 'slap',
  async execute(client, message, args) {

    var target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    if(!target) {

      var embed = new Discord.MessageEmbed()
        .setDescription(`<:cancel:960946118521405511> Please specify a user.`)
      return await message.reply({ embeds: [embed] })
    }

    var gif = love.slap()
    var embed = new Discord.MessageEmbed()
      .setDescription(`${message.author} slapped ${target.user }`)
      .setImage(gif)
    await message.reply({ embeds: [embed] })
  }
}
