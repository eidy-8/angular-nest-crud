import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiData } from '../../services/api-data';
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

  private unsubscribe = new Subject<void>();

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(public apiData: ApiData, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    initFlowbite();
  }

  protected registerAccount(): void {
    if (!this.registerForm.value.name) {
      this.alertMessage = 'Preencha o campo nome!';
      return;
    }

    if (!this.registerForm.value.email) {
      this.alertMessage = 'Preencha o campo email!';
      return;
    }

    if (!this.registerForm.value.password) {
      this.alertMessage = 'Preencha o campo senha!';
      return;
    }

    this.apiData.postUser(this.registerForm.value).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: () => {
        this.router.navigate(['auth/login']);
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
