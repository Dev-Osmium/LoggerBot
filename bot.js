const discord = require('discord.js');
const client = new Discord.Client();
const winston = require('winston');
const config = require('config.json');

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'messageLog.log',
            json: true,
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
    client.setGame('with the logs!');
})

client.on('message', (message) => {
    logger.log('info', `${message.author.username} sent a message containing the following text: ${message.content}`);
    if(config.logChannel) {
        logChannel = message.guild.channels.get(config.logChannelId);
        logChannel.send(`${message.author.username} sent a message containing the following text: ${message.content}`)
    }
})