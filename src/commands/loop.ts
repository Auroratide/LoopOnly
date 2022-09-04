import type { Command } from './command'
import type { CommandInteraction, GuildMember } from 'discord.js'
import { OptionType } from './command'
import {
    joinVoiceChannel,
} from '@discordjs/voice'
import { ensureExistence } from '../ensure-existence'
import { getAudioPlayer, AudioFile, YoutubeAudio } from '../players'

export const Loop: Command = {
    name: 'loop',
    description: 'Loop a song!',
    options: {
        url: {
            name: 'url',
            type: OptionType.string,
            description: 'Location of the sound file',
            required: true,
        },
    },
    execute: async (interaction: CommandInteraction) => {
        const guildId = ensureExistence(interaction.guild?.id, 'Bot can only be used within a Discord Server')
        const channelId = ensureExistence((interaction.member as GuildMember).voice.channel?.id, 'You must be in a voice channel to start a song.')
        const url = ensureExistence(interaction.options.get(Loop.options!.url.name), 'Url is a required option.').value as string

        const player = getAudioPlayer(guildId)

        const connection = joinVoiceChannel({
            channelId,
            guildId,
            adapterCreator: interaction.guild!.voiceAdapterCreator,
        })

        const song = /^https:\/\/www\.youtube\.com/.test(url) || /^https:\/\/youtu\.be/.test(url)
            ? new YoutubeAudio(url)
            : new AudioFile(url)

        player.connectTo(connection)
        await player.play(song).then(async () => {
            await interaction.reply('Playing your song!')
        }).catch(async err => {
            await interaction.reply(err.message)
        })
    },
}
