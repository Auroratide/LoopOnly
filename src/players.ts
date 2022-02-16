import type { Snowflake } from 'discord.js'
import type { AudioPlayer, AudioResource, VoiceConnection } from '@discordjs/voice'
import {
    createAudioResource,
    createAudioPlayer,
    AudioPlayerStatus,
} from '@discordjs/voice'
import * as fetch from './fetch'

export interface Song {
    createResource: () => Promise<AudioResource>
}

export class AudioFile implements Song {
    private url: string
    constructor(url: string) {
        this.url = url
    }

    createResource = async (): Promise<AudioResource> =>
        createAudioResource(await fetch.audio(this.url))
}

export class YoutubeAudio implements Song {
    private url: string
    constructor(url: string) {
        this.url = url
    }

    createResource = async (): Promise<AudioResource> =>
        createAudioResource(await fetch.youtube(this.url))
}

export class LoopOnlyPlayer {
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

    pause = () => {
        this.player.pause()
    }

    resume = () => {
        this.player.unpause()
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
export const getAudioPlayer = (id: Snowflake): LoopOnlyPlayer => {
    if (!players[id])
        players[id] = createLoopOnlyPlayer()

    return players[id]
}
