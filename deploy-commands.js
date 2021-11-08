import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { config } from './config.js'

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Reply with pong').toJSON(),
]

const rest = new REST({ version: '9' }).setToken(config.token)
rest.put(Routes.applicationGuildCommands(config.client, config.guild), { body: commands })
    .then(() => console.log('Hooray! It worked.'))
    .catch(console.error)
