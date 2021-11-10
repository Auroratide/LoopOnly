import type { Command } from './command'
import type { CommandInteraction, GuildMember } from 'discord.js'
import * as path from 'path'
import {
    createAudioResource,
    createAudioPlayer,
    joinVoiceChannel,
    VoiceConnectionStatus,
} from '@discordjs/voice'

let resource = createAudioResource(path.join(__dirname, '..', '..', 'sample.mp3'))
let player = createAudioPlayer()

export const Loop: Command = {
    name: 'loop',
    description: 'Loop a song!',
    execute: async (interaction: CommandInteraction) => {
        const connection = joinVoiceChannel({
            channelId: (interaction.member as GuildMember).voice.channel!.id,
            guildId: interaction.guild!.id,
            adapterCreator: interaction.guild!.voiceAdapterCreator,
        })
        const subscription = connection.subscribe(player)

        connection.on(VoiceConnectionStatus.Disconnected, () => {
            subscription?.unsubscribe()
        })

        player.play(resource)

        await interaction.reply(`Finished`)
    },
}