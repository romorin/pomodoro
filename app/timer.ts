import { CounterId } from './counter-id';
import { CounterStatus } from './counter-status';

export interface Timer {
	statusLabel: string;
	countdown: number;
	leftDecoration: string;
	rightDecoration: string;
	stateLabel: string;
	editLabel: string;
	resetLabel: string;

	switchCounter() : void;
}
