import { LoopOnlyError } from './error'

export const ensureExistence = <T>(id: T | undefined | null, message: string): T => {
    if (id != null)
        return id
    else
        throw new LoopOnlyError(message)
}