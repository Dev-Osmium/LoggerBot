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
    if (message.guild) {
        if (message.author.bot) return;
        logger.log('info', `${message.author.username} sent a message containing the following text: ${message.content}`);
        if (config.logChannel) {
            guild = message.guild;
            logChannel = guild.channels.get(config.logChannelId);
            logChannel.send(`${message.author.username} sent a message containing the following text: ${message.content}`)
        }
    }
})

client.login(config.token);