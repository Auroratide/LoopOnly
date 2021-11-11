import type { Command } from './command'
import type { CommandInteraction } from 'discord.js'
import { ensureExistence } from '../ensure-existence'
import { getAudioPlayer } from '../players'

export const Pause: Command = {
    name: 'pause',
    description: 'Pause the song',
    execute: async (interaction: CommandInteraction) => {
        const guildId = ensureExistence(interaction.guild?.id, 'Bot can only be used within a Discord Server')
        const player = getAudioPlayer(guildId)

        player.pause()

        await interaction.reply('Song paused!')
    },
}