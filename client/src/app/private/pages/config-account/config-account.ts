import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../services/user';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Subject, takeUntil } from 'rxjs';
import { ApiData } from '../../../auth/services/api-data';

@Component({
  selector: 'app-config-account',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './config-account.html',
  styleUrl: './config-account.css',
})
export class ConfigAccount {

  alertMessage: string | null = null;

  successAlertMessage: string | null = null;
  
  private unsubscribe = new Subject<void>();

  protected userId!: string;
  protected userName!: string; 
  protected userEmail!: string;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(public apidata: ApiData, public user: User, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    initFlowbite();

    this.getUserInfo();
  }

  protected getUserInfo() {
    const token = sessionStorage.getItem('Session-Token');

    this.apidata.verifyToken(token)
    .pipe(
      takeUntil(this.unsubscribe)
    ).subscribe({
      next: res => {        
        this.userId = res.id;
        this.userName = res.name;
        this.userEmail = res.email;

        this.userForm.patchValue({
          name: res.name,
          email: res.email,
          password: ''
        });

        this.cdr.detectChanges();
      },
      error: () => {
        console.log("Não foi possível processar sua requisição");
      }
    });
  };

  protected updateUser(): void {
    if (!this.userForm.value.name) {
      this.alertMessage = 'Preencha o campo nome!';
      return;
    }

    if (!this.userForm.value.email) {
      this.alertMessage = 'Preencha o campo email!';
      return;
    }

    if (!this.userForm.value.password) {
      this.alertMessage = 'Preencha o campo senha!';
      return;
    }

    this.user.update(this.userId, this.userForm.value).pipe( takeUntil( this.unsubscribe ) ).subscribe({
      next: () => {
        this.successAlertMessage = 'Usuário atualizado com sucesso'
        this.alertMessage = null;
        this.cdr.detectChanges();
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
