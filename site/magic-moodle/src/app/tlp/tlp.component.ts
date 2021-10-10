import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tlp',
  templateUrl: './tlp.component.html',
  styleUrls: ['./tlp.component.css']
})
export class TlpComponent implements OnInit {
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
