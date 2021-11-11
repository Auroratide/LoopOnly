import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { config } from './config.js'
import { commands } from './commands'
import { OptionType } from './commands/command'

type OptionBuilderBuilder = (fn: (option: OptionBuilder) => OptionBuilder) => SlashCommandBuilder

type OptionBuilder = {
    setName: (value: string) => OptionBuilder,
    setDescription: (value: string) => OptionBuilder,
    setRequired: (value: boolean) => OptionBuilder,
}

const optionBuilder: Record<OptionType, keyof SlashCommandBuilder> = {
    [OptionType.string]: 'addStringOption',
}

const commandBody = commands.map(command => {
    let builder = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
    
    Object.values(command.options ?? {}).forEach((option) => {
        builder = ((builder[optionBuilder[option.type]] as unknown) as OptionBuilderBuilder)(it => it
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(option.required ?? false)
        )
    })

    return builder.toJSON()
})

const rest = new REST({ version: '9' }).setToken(config.token)

const route = process.env.NODE_ENV === 'prod'
    ? Routes.applicationCommands(config.client) 
    : Routes.applicationGuildCommands(config.client, config.guild)

rest.put(route, { body: commandBody })
    .then(() => console.log('Hooray! It worked.'))
    .catch(console.error)
