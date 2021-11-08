const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { config } = require('./config.js')

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Reply with pong').toJSON(),
    new SlashCommandBuilder().setName('loop').setDescription('Loop a song').toJSON(),
    new SlashCommandBuilder().setName('info').setDescription('Get arbitrary info').toJSON(),
]

const rest = new REST({ version: '9' }).setToken(config.token)
rest.put(Routes.applicationGuildCommands(config.client, config.guild), { body: commands })
    .then(() => console.log('Hooray! It worked.'))
    .catch(console.error)
