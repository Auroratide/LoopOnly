import * as stream from 'stream'
import fetch from 'node-fetch'

export const audio = async (url: string): Promise<stream.Readable> => {
    const res = await fetch(url)

    return stream.Readable.from(res.body!)
}