import { Pipe, PipeTransform } from '@angular/core';
/*
 * Extract minutes from a number in milliseconds
 *
*/
@Pipe({name: 'seconds'})
export class CountdownSecondsPipe implements PipeTransform {
  transform(value: number): number {
    return value%60;
  }
}
