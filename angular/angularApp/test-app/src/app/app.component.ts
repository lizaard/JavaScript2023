import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'test-app';
  dataPassed = '';
  username: string = '';
  button: boolean = true;
  event:any[] = [];

  click() {
    this.dataPassed = 'ceva';
  }

  passingData(value: Event) {
    this.dataPassed = (<HTMLInputElement>value.target).value;
  }

  clickReset() {
    this.username = '';
  }

  clickBUtton() {
    this.button = !this.button;
    // this.event.push(this.event.length + 1)
    this.event.push(new Date())
  }
}
