import { CounterStatus } from './counter-status';
import { CounterId } from './counter-id';
import { Timer } from './timer';
import { CounterContext } from './counter-context';

class CounterTemplate {
	constructor(
		public titleLabel: string,
		public toggleButtonLabel: string
	) {}
}

export class TimerLabelGenerator {
	private templates: {[status: number]: CounterTemplate} = {};
	private verbs: {[id: number]: string} = {};

	constructor() {
		this.templates[CounterStatus.Running] =	new CounterTemplate("@ for", "Pause");
		this.templates[CounterStatus.Paused] = new CounterTemplate("Start @", "Go!");
		this.templates[CounterStatus.Over] = new CounterTemplate("# time", "#");
		this.verbs[CounterId.Work] = "Work";
		this.verbs[CounterId.Pause] = "Pause";
	}

	public applyTemplates(timer: Timer, counter: CounterContext, status: CounterStatus) {
		timer.statusLabel = this.templates[status].titleLabel.replace('@', this.verbs[counter.id]).
				replace('#', this.verbs[counter.nextId]);
		timer.stateLabel = this.templates[status].toggleButtonLabel.replace('@', this.verbs[counter.id]).
				replace('#', this.verbs[counter.nextId]);
	}

	public getVerb(id:CounterId) {
		return this.verbs[id];
	}

	public setVerb(id:CounterId, newVerb: string) {
		this.verbs[id] = newVerb;
	}
}
