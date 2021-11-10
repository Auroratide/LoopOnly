import { CommandInteraction } from 'discord.js'

export type Command = {
    name: string,
    description: string,
    options?: { [name: string]: Option },
    execute: (interaction: CommandInteraction) => Promise<void>,
}

export enum OptionType {
    string = 'string',
}

export type Option = {
    name: string,
    type: OptionType,
    description: string,
    required?: boolean,
}
