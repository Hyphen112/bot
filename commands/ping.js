var Discord = require('discord.js');
var ms = require('ms');

module.exports = {
  name: 'ping',
  async execute(client, message, args) {

    var embed = new Discord.MessageEmbed()
      .setDescription(`Pong: \n> Latency: ${ms(client.ws.ping)} \n> Uptime: ${ms(client.uptime)}`)
    await message.reply({ embeds: [embed] })
  }
}
