import type { Command } from './command'
import type { CommandInteraction } from 'discord.js'
import { ensureExistence } from '../ensure-existence'
import {
    getVoiceConnection,
} from '@discordjs/voice'
import { getAudioPlayer } from '../players'

export const disconnect = async (interaction: CommandInteraction): Promise<boolean> => {
    const guildId = ensureExistence(interaction.guild?.id, 'Bot can only be used within a Discord Server')
    const connection = getVoiceConnection(guildId)
    if (connection) {
        const player = getAudioPlayer(guildId)

        player.stop()
        connection?.disconnect()

        return true
    } else {
        return false
    }
}

export const Disconnect: Command = {
    name: 'disconnect',
    description: 'Boot the bot from the chat',
    execute: async (interaction: CommandInteraction) => {
        if (await disconnect(interaction))
            await interaction.reply('Bye bye!')
        else
            await interaction.reply('Already disconnected!')
    },
}
