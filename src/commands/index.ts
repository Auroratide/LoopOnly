import type { Command } from './command'
import { Help } from './help'
import { Loop } from './loop'

export const commands: Command[] = [
    Help,
    Loop,
]
