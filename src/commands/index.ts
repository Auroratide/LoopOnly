import type { Command } from './command'
import { Disconnect } from './disconnect'
import { Help } from './help'
import { Loop } from './loop'
import { Pause } from './pause'
import { Resume } from './resume'

export const commands: Command[] = [
    Disconnect,
    Help,
    Loop,
    Pause,
    Resume,
]
