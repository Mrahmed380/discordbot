const Discord = require('discord.js')
exports.run = async(client, msg, args) => {
  const helpembed = new Discord.MessageEmbed()
  .setAuthor("DesireBot Help", message.author.avatarURL)
  .setDescription("Some commands will be shown here. Some will not.")
  .addField("⚒️ Moderation ⚒️", "**.ban**\n**.kick**\n**.mute**\n**.warn**")
  .addField("🎱 Fun 🎱",  "**.8ball**\n**.future**\n**.flip**")
  .addField("💫 Other 💫", "**.userinfo / .whois**\\n**.botinfo**")
  msg.channel.sebd(helpembed);
 }


