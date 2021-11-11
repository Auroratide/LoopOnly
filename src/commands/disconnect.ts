import type { Command } from './command'
import type { CommandInteraction } from 'discord.js'
import { ensureExistence } from '../ensure-existence'
import {
    getVoiceConnection,
} from '@discordjs/voice'

export const Disconnect: Command = {
    name: 'disconnect',
    description: 'Boot the bot from the chat',
    execute: async (interaction: CommandInteraction) => {
        const guildId = ensureExistence(interaction.guild?.id, 'Bot can only be used within a Discord Server')
        const connection = getVoiceConnection(guildId)

        connection?.disconnect()

        await interaction.reply('Bye bye!')
    },
}
