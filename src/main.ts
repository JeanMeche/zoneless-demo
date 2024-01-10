import {Component, signal, ɵprovideZonelessChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
  <h1>Zoneless Demo  !</h1>
  Value: {{value()}}
  `,
})
export class AppComponent {
  value = signal(0);

  constructor() {
    // We're running zoneless, ZoneJS is not loaded in by the polyfills.
    // setInterval doesn't trigger CD, signal.update does !
    setInterval(() => {
      this.value.update((v) => v + 1);
    }, 1000)
  }
}


bootstrapApplication(AppComponent, {
  /* ɵprovideZonelessChangeDetection enables zoneless magic */
  providers: [ɵprovideZonelessChangeDetection()]
}).catch((err) => console.error(err));
