import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({})

  onRegister() {
    this.router.navigate(['/login-component'])
  }

  /*public form = this.formBuilder.group({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    schoolCode: '',
    age: '',
    gender: ''
  })*/
  
  constructor(private formBuilder: FormBuilder, private router: Router) {

  }

  onSubmit(): void {
    
  }

  ngOnInit(): void {
  }

}
