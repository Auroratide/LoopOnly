import { Client, Intents } from 'discord.js'
import { config } from './config.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => {
    console.log('ready!')
})

client.login(config.token)
