import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApiData } from '../../auth/services/api-data';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {

  protected unsubscribe = new Subject<void>();

  protected userName!: string; 
  protected userEmail!: string;

  constructor(public apidata: ApiData, private router: Router, private cdr: ChangeDetectorRef) { }

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
        this.userName = res.name;
        this.userEmail = res.email;

        this.cdr.detectChanges();
      },
      error: () => {
        console.log("Não foi possível processar sua requisição");
      }
    });
  };

  protected logout() {
    sessionStorage.removeItem('Session-Token');

    this.router.navigate(['/']);
  }
}

