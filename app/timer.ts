import { CounterId } from './counter-id';
import { CounterStatus } from './counter-status';
import { CounterTemplate } from './counter-template';

export interface Timer {
	statusLabel: string;
	countdown: number;
	leftDecoration: string;
	rightDecoration: string;
	stateLabel: string;
	editLabel: string;
	resetLabel: string;

	applyTemplates(status: CounterStatus, current: CounterId, next: CounterId): void;
	getVerb(id:CounterId): string;
	switchCounter() : void;
}
