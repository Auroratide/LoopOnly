import type { Command } from './command'
import type { CommandInteraction } from 'discord.js'

const text = `I can do these things!

\`/loop URL\`: Loop a song over and over again. The URL should be an audio file uploaded somewhere, and you should be in a voice channel.
\`/pause\`: Pause the music
\`/resume\`: Resume the music
\`/disconnect\`: Disconnect me from the voice channel
`

export const Help: Command = {
    name: 'help',
    description: 'Learn what LoopOnly can do',
    execute: async (interaction: CommandInteraction) => {
        await interaction.reply(text)
    },
}