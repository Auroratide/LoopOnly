import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { config } from './config.js'
import { commands } from './commands'

const commandBody = commands.map(command =>
    new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .toJSON()
    )

const rest = new REST({ version: '9' }).setToken(config.token)
rest.put(Routes.applicationGuildCommands(config.client, config.guild), { body: commandBody })
    .then(() => console.log('Hooray! It worked.'))
    .catch(console.error)
