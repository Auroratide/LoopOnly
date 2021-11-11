import * as stream from 'stream'
import fetch from 'node-fetch'
import { LoopOnlyError } from './error'

export const audio = async (url: string): Promise<stream.Readable> => {
    const res = await fetch(url).catch(() => {
        throw new LoopOnlyError(`Failed to fetch resource at ${url}`)
    })

    if (!res.ok) {
        throw new LoopOnlyError(`Failed to fetch resource at ${url}`)
    }

    const contentType = res.headers.get('Content-Type') ?? ''
    if (!/^audio\/.*/.test(contentType)) {
        throw new LoopOnlyError(`Resource at ${url} is not a recognized audio file (${contentType})`)
    }

    return stream.Readable.from(res.body!)
}