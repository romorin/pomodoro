import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { CountdownMinutesPipe } from './countdown-minutes.pipe';
import { CountdownSecondsPipe } from './countdown-seconds.pipe';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CountdownMinutesPipe, CountdownSecondsPipe ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
