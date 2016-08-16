export interface Timer {
	statusLabel: string;
	countdown: number;
	leftDecoration: string;
	rightDecoration: string;
	stateLabel: string;

	switchCounter() : void;
}
