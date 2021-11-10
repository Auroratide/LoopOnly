import type { Command } from './command'
import type { CommandInteraction } from 'discord.js'

export const Help: Command = {
    name: 'help',
    description: 'Learn what LoopOnly can do',
    execute: async (interaction: CommandInteraction) => {
        await interaction.reply('I\'m not super helpful right now!')
    },
}