import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Subject, takeUntil } from 'rxjs';
import { ApiData } from '../../services/api-data';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {

  alertMessage: string | null = null;

  private unsubscribe = new Subject<void>();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(public apiData: ApiData, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    initFlowbite();
  }

  protected login(): void {    
    if (!this.loginForm.value.email) {
      this.alertMessage = 'Preencha o campo email!';
      return;
    }

    if (!this.loginForm.value.password) {
      this.alertMessage = 'Preencha o campo senha!';
      return;
    }

    this.apiData.postLogin(this.loginForm.value).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: res => {
        sessionStorage.setItem("Session-Token", res.access_token);
        this.router.navigate(['user']);
      },
      error: error => {
        this.alertMessage = error.message;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
