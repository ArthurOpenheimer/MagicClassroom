import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({

  })
  
  constructor(private formBuilder: FormBuilder,) {}

  onSubmit(): void {
   
  }
  
  ngOnInit(): void {
  }
}
