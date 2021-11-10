import type { Command } from './command'
import type { CommandInteraction, GuildMember, Snowflake } from 'discord.js'
import type { AudioPlayer } from '@discordjs/voice'
import * as path from 'path'
import {
    createAudioResource,
    createAudioPlayer,
    joinVoiceChannel,
} from '@discordjs/voice'
import { LoopOnlyError } from '../error'

let resource = createAudioResource(path.join(__dirname, '..', '..', 'sample.mp3'))

const players: Record<Snowflake, AudioPlayer> = {}
const getAudioPlayer = (id: Snowflake): AudioPlayer => {
    if (!players[id])
        players[id] = createAudioPlayer()

    return players[id]
}

export const Loop: Command = {
    name: 'loop',
    description: 'Loop a song!',
    execute: async (interaction: CommandInteraction) => {
        const guildId = ensureId(interaction.guild?.id, 'Bot can only be used within a Discord Server')
        const channelId = ensureId((interaction.member as GuildMember).voice.channel?.id, 'You must be in a voice channel to start a song.')

        const player = getAudioPlayer(guildId)

        const connection = joinVoiceChannel({
            channelId,
            guildId,
            adapterCreator: interaction.guild!.voiceAdapterCreator,
        })

        connection.subscribe(player)
        player.play(resource)

        await interaction.reply('Playing your song!')
    },
}

const ensureId = <T>(id: T | undefined | null, message: string): T => {
    if (id != null)
        return id
    else
        throw new LoopOnlyError(message)
}