const Discord = require('discord.js')
exports.run = async(client, msg, args) => {
  const helpembed = new Discord.MessageEmbed()
  .setTitle('Help Menu.')
  .setDescription("Some commands will be shown here. Some will not.")
  .addField("Moderation ⚒️", "**.ban** **.kick** **.mute** **.warn**")
  .addField("Fun 🎱",  "**.8ball** **.future** **.flip**")
  .addField("Other 💫", "**.userinfo / .whois**\\n**.botinfo**")
  msg.channel.send(helpembed);
 }


