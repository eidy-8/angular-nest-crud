import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiData } from '../../../private/services/api-data';
import { Subject, takeUntil } from 'rxjs';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit, OnDestroy {

  alertMessage: string | null = null;

  private unsubscribe = new Subject<void>;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(public apiData: ApiData, private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
  }

  protected registerAccount() {
    if (!this.registerForm.value.name) {
      return console.log('name');
    }

    if (!this.registerForm.value.email) {
      return console.log('email');
    }

    if (!this.registerForm.value.password) {
      return console.log('password');
    }

    this.apiData.postUser(this.registerForm.value).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {
        this.router.navigate(['auth/login']);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
