import { Client, Intents, Interaction } from 'discord.js'
import { generateDependencyReport } from '@discordjs/voice'

import { config } from './config.js'
import { commands } from './commands'
import { LoopOnlyError } from './error.js'

console.log(generateDependencyReport())

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] })

client.once('ready', () => {
    console.log('ready!')
})

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    try {
        commands.find(c => c.name === interaction.commandName)?.execute(interaction)
        // ignore if command not known
    } catch (e) {
        if (e instanceof LoopOnlyError) {
            await interaction.reply(`LoopOnly Error: ${e.message}`)
        } else {
            throw e
        }
    }
})

client.login(config.token)
