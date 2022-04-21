const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
  name: 'banner',
  async execute(client, message, args) {

    var target = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

    axios.get(`https://discord.com/api/users/${target.user.id}`, {
      headers: {
        Authorization: `Bot ${client.token}`
      },
    })
    .then(res => {
      const { banner, accent_color } = res.data;

      if(banner) {
        const extention = banner.startsWith("a_") ? `.gif` : `.png`
        const url = `https://cdn.discordapp.com/banners/${target.user.id}/${banner}${extention}?size=512`

        const embed = new Discord.MessageEmbed()
          .setTitle(`${target.user.tag}:`)
          .setImage(url)
        message.reply({ embeds: [embed] })
      } 
      else {

          const embed = new Discord.MessageEmbed()
          .setDescription(`<:cancel:960946118521405511> This user doesn't have a banner.`)
          message.reply({ embeds: [embed] })
      }
    })
  }
}
