import { Timer } from './timer';
import { CounterStatus } from './counter-status';
import { CounterId } from './counter-id';

export interface CounterContext {
	limit: number;
	timer: Timer;
	id: CounterId,
	nextId: CounterId,
}
