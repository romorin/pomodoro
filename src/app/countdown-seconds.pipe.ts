import { Pipe, PipeTransform } from '@angular/core';

/*
 * Extract minutes from a number in milliseconds
*/
@Pipe({name: 'seconds'})
export class CountdownSecondsPipe implements PipeTransform {
	transform(value: number): string {
		let result = Math.round(value % 60);
		if (result < 10) {
			return '0' + result;
		} else {
			return (result.toString());
		}
	}
}
