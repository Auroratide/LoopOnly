import type { Command } from './command'
import type { CommandInteraction, GuildMember, Snowflake } from 'discord.js'
import type { AudioPlayer, AudioResource, VoiceConnection } from '@discordjs/voice'
import { OptionType } from './command'
import {
    createAudioResource,
    createAudioPlayer,
    joinVoiceChannel,
    AudioPlayerStatus,
} from '@discordjs/voice'
import { LoopOnlyError } from '../error'
import * as fetch from '../fetch'

class Song {
    private url: string
    constructor(url: string) {
        this.url = url
    }

    createResource = async (): Promise<AudioResource> =>
        createAudioResource(await fetch.audio(this.url))
}

class LoopOnlyPlayer {
    private player: AudioPlayer
    private song: Song | null

    constructor(audio: AudioPlayer) {
        this.player = audio
        this.song = null
        this.player.on(AudioPlayerStatus.Idle, this.repeat)
    }

    play = async (song: Song) => {
        this.song = song
        this.player.play(await song.createResource())
    }

    connectTo = (connection: VoiceConnection) => connection.subscribe(this.player)

    private repeat = async () => {
        if (this.song !== null) {
            this.player.play(await this.song.createResource())
        }
    }
}

const players: Record<Snowflake, LoopOnlyPlayer> = {}
const createLoopOnlyPlayer = () => new LoopOnlyPlayer(createAudioPlayer())
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

        const song = new Song(url)

        player.connectTo(connection)
        await player.play(song)

        await interaction.reply('Playing your song!')
    },
}

const ensureExistence = <T>(id: T | undefined | null, message: string): T => {
    if (id != null)
        return id
    else
        throw new LoopOnlyError(message)
}