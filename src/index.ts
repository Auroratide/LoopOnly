import { Client, GatewayIntentBits, Interaction } from 'discord.js'
import { generateDependencyReport } from '@discordjs/voice'

import { config } from './config.js'
import { commands } from './commands'
import { LoopOnlyError } from './error.js'
import { disconnect } from './commands/disconnect.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] })

client.once('ready', () => {
    if (config.debug) {
        console.log(generateDependencyReport())
    }

    console.log('Ready!')
})

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    try {
        await commands.find(c => c.name === interaction.commandName)?.execute(interaction)
        // ignore if command not known
    } catch (e) {
        if (e instanceof LoopOnlyError) {
            await interaction.reply(e.message)
        } else {
            console.error(e)
            await disconnect(interaction)
            await interaction.reply('LoopOnly encountered a fatal error and had to disconnect.')
        }
    }
})

client.login(config.token)
