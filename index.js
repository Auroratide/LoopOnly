const { Client, Intents } = require('discord.js')
const { generateDependencyReport } = require('@discordjs/voice')
const { joinVoiceChannel } = require('@discordjs/voice')
const { config } = require('./config.js')

console.log(generateDependencyReport())

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] })

client.once('ready', () => {
    console.log('ready!')
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction

    if (commandName === 'ping') {
        await interaction.reply('pong!')
    } else if (commandName === 'loop') {

    } else if (commandName === 'info') {
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        })

        await interaction.reply(`Finished`)
    }
})

client.login(config.token)
