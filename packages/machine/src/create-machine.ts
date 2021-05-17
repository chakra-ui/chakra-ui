import { Machine } from "./machine"
import { Dict, StateMachine } from "./types"

export const createMachine = <
  C extends Dict,
  S extends string,
  E extends StateMachine.EventObject = StateMachine.AnyEventObject
>(
  config: StateMachine.MachineConfig<C, S, E>,
  opts?: StateMachine.MachineOptions<C, E>,
) => new Machine(config, opts)
