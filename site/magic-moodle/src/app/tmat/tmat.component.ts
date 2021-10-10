import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tmat',
  templateUrl: './tmat.component.html',
  styleUrls: ['./tmat.component.css']
})
export class TmatComponent implements OnInit {
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
