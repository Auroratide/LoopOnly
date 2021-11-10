import type { Command } from './command'
import type { CommandInteraction, GuildMember, Snowflake } from 'discord.js'
import type { AudioPlayer } from '@discordjs/voice'
import * as path from 'path'
import { OptionType } from './command'
import {
    createAudioResource,
    createAudioPlayer,
    joinVoiceChannel,
} from '@discordjs/voice'
import { LoopOnlyError } from '../error'
import * as fetch from '../fetch'

type LoopOnlyPlayer = {
    audio: AudioPlayer,
}

const players: Record<Snowflake, LoopOnlyPlayer> = {}
const createLoopOnlyPlayer = () => ({
    audio: createAudioPlayer(),
})
const getAudioPlayer = (id: Snowflake): LoopOnlyPlayer => {
    if (!players[id])
        players[id] = createLoopOnlyPlayer()

    return players[id]
}

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
        const url = ensureExistence(interaction.options.getString(Loop.options!.url.name), 'Url is a required option.')

        const player = getAudioPlayer(guildId)

        const connection = joinVoiceChannel({
            channelId,
            guildId,
            adapterCreator: interaction.guild!.voiceAdapterCreator,
        })

        const song = createAudioResource(await fetch.audio(url))

        connection.subscribe(player.audio)
        player.audio.play(song)

        await interaction.reply('Playing your song!')
    },
}

const ensureExistence = <T>(id: T | undefined | null, message: string): T => {
    if (id != null)
        return id
    else
        throw new LoopOnlyError(message)
}