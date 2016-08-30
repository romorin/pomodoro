import { CounterStatus } from './counter-status';
import { CounterConstants } from './counter-constants';

class CounterDecoration {
	constructor(
		public left: string,
		public right: string
	) {}
}

export class Counter {
	private _status = CounterStatus.Paused;
	private _title: string;
	private _length: number;
	private _remaining: number;
	private _interval: any;
	private _decorations: {[status: number]: CounterDecoration} = {};

	private _titleBackup: string;
	private _lengthBackup: number;

	constructor(_constants: CounterConstants) {
		this._title = _constants.ACTION;
		this._length = _constants.LENGTH;
		this._remaining = this._length;
		this._interval = null;

		this._decorations[CounterStatus.Running] = new CounterDecoration(
			_constants.RUNNING_LEFT_DECORATION, _constants.RUNNING_RIGHT_DECORATION);
		this._decorations[CounterStatus.Paused] = new CounterDecoration(
			_constants.PAUSED_LEFT_DECORATION, _constants.PAUSED_RIGHT_DECORATION);
		this._decorations[CounterStatus.Over] = new CounterDecoration(
			_constants.OVER_LEFT_DECORATION, _constants.OVER_RIGHT_DECORATION);
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

	public getDecorations(): CounterDecoration {
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
			if (this._remaining < 1) {
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
