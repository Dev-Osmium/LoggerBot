const discord = require('discord.js');
const client = new discord.Client();
const winston = require('winston');
const config = require('./config.json');

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'messageLog.log',
            json: false,
            colorize: true
        }),
        new winston.transports.Console({
            level: 'info',
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

client.on('ready', () => {
    logger.log('info', 'Initialized Successfully');
    client.user.setActivity('with the logs!');
})

client.on('message', (message) => {
    var logMsg = `${message.author.username}#${message.author.discriminator} sent a message in <#${message.channel.id}>: ${message.content}`;
    var logEmbed = new discord.RichEmbed()
        .setColor('#00007f')
        .setAuthor(message.author.username + '#' + message.author.discriminator, 'https://no.domain')
        .setTitle("Message Log")
        .addField("Channel", message.channel.name)
        .addField("Author", message.author.username)
        .setDescription(message.content);
    if (message.guild) {
        if (message.author.bot) return;
        logger.log('info', logMsg);
        if (message.attachments) {
            var attachments = message.attachments;
            
        }
        if (config.logChannel) {
            guild = message.guild;
            logChannel = guild.channels.get(config.logChannelId);
            logChannel.send(logEmbed);
        }
    }
})

client.login(config.token);