import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tsoc',
  templateUrl: './tsoc.component.html',
  styleUrls: ['./tsoc.component.css']
})
export class TsocComponent implements OnInit {
  wasPressed = false;
  sent = false;

  click(state: any) {
    this.wasPressed = state;
    this.sent = false;
  }

  send() {
    this.sent = true;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
