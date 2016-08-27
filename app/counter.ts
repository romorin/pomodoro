import { CounterStatus } from './counter-status';
import { CounterDecoration } from './counter-decoration';

export class Counter {
	private _status = CounterStatus.Paused;
	private _remaining: number;
	private _interval: any;
	private _decorations: {[status: number]: CounterDecoration} = {};

	private _titleBackup: string;
	private _lengthBackup: number;

	constructor(private _title: string, private _length: number,
			runningDecorations: CounterDecoration,
			pausedDecorations: CounterDecoration,
			overDecorations: CounterDecoration) {
		this._remaining = this._length;
		this._interval = null;

		this._decorations[CounterStatus.Running] = runningDecorations;
		this._decorations[CounterStatus.Paused] = pausedDecorations;
		this._decorations[CounterStatus.Over] = overDecorations;
	}

	public toggle(onTick: (counter: Counter) => void) {
		if (this._status === CounterStatus.Paused) {
			this.startCounting(onTick);
		} else if (this._status ===  CounterStatus.Running) {
			this.stopCounting();
		}
	}

	public reset() {
		if (this._interval) {
			this.stopInterval();
		}
		this._status = CounterStatus.Paused;
		this._remaining = this._length;
	}

	public get length() {
		return this._length;
	}

	public set length(newLength: number) {
		this.setLength(newLength);
	}

	protected setLength(newLength: number) {
		this._length = newLength > 1 ? newLength : 1;
		this._remaining = this._length;
	}

	public backup() {
		this._titleBackup = this._title;
		this._lengthBackup = this._length;
	}

	public restore() {
		this._title = this._titleBackup;
		this.setLength(this._lengthBackup);
	}

	public get remaining() {
		return this._remaining;
	}

	public get title() {
		return this._title;
	}

	public set title(newTitle: string) {
		this._title = newTitle;
	}

	public getDecorations() : CounterDecoration {
		return this._decorations[this._status];
	}

	public get status() {
		return this._status;
	}

	private startCounting(onTick: (counter: Counter) => void) {
		if (this._remaining === null) {
			this._remaining = this._length;
		}
		this._status = CounterStatus.Running;
		this._interval = setInterval(() => {
			this._remaining -= 1;
			if(this._remaining < 1) {
				this.stopInterval();
				this._status = CounterStatus.Over;
			}
			onTick(this);
		}, 1000);
	}

	private stopCounting() {
		this._status = CounterStatus.Paused;
		this.stopInterval();
	}

	private stopInterval() {
		clearInterval(this._interval);
		this._interval = null;
	}
}
