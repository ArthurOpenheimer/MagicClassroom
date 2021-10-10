import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tsd',
  templateUrl: './tsd.component.html',
  styleUrls: ['./tsd.component.css']
})
export class TsdComponent implements OnInit {
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
