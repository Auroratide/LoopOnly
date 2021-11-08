import { Client, Intents } from 'discord.js'
import { config } from './config.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => {
    console.log('ready!')
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction

    if (commandName === 'ping') {
        await interaction.reply('pong!')
    }
})

client.login(config.token)
