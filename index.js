var config = require('./config.json');

var Discord = require('discord.js');

var client = new Discord.Client();

client.on('ready', async() => {

    console.log('Hello!');

});

client.on('message', async(msg) => {

    if(msg.author.bot) return;

    if(!msg.guild) return;

    var prefix = config.prefix;

    if(!msg.content.toLowerCase().startsWith(prefix)) return;

    var args = msg.content.split(' ');

    var cmd = args.shift().slice(prefix.length).toLowerCase();

    try {

        var file = require(`./commands/${cmd}.js`);

        file.run(client, msg, args);

    } catch(err) {

        console.warn(err);

    }

});

client.on('guildMemberAdd', member => {

   const channel = member.guild.channels.cache.find(ch => ch.name === 'general');

  if(!channel) return;

 var welcome = new Discord.MessageEmbed()

  .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())

  .setColor("#00ff00")

  .setDescription(`Hey **${member.user.username}**, welcome to **Desire**!`)

.addField('\u200B', '\u200B')

 .setFooter(`Member #${member.guild.memberCount}`)
 channel.send(welcome);
 

})

client.login(config.token);
