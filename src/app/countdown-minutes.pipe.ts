import { Pipe, PipeTransform } from '@angular/core';

/*
 * Extract minutes from a number in milliseconds
*/
@Pipe({name: 'minutes'})
export class CountdownMinutesPipe implements PipeTransform {
	transform(value: number): number {
		return Math.floor(value / 60);
	}
}
