import { Injectable } from '@angular/core';
import { CounterConstants } from './counter-constants';
import { Counter } from './counter';

@Injectable()
export class CounterFactory {
	public init(_constants: CounterConstants) {
		return new Counter(_constants);
	}
}
