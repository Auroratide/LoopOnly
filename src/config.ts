export type Config = {
    token: string,
    client: string,
    guild: string,
    debug: boolean,
}

export const config: Config = {
    token: process.env.DISCORD_TOKEN ?? '',
    client: process.env.CLIENT_ID ?? '',
    guild: process.env.GUILD_ID ?? '',
    debug: process.env.DEBUG_MODE === 'true',
}
