import type { Command } from './command'
import { Help } from './help'
import { Loop } from './loop'
import { Pause } from './pause'
import { Resume } from './resume'

export const commands: Command[] = [
    Help,
    Loop,
    Pause,
    Resume,
]
