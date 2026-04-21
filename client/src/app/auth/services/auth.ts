import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiData } from './api-data';

@Injectable({
  providedIn: 'root',
})
export class Auth implements OnDestroy {

  protected unsubscribe = new Subject<void>();
  protected authenticated = false;

  constructor(public apidata: ApiData) { }

  isAuthenticated(): Promise<boolean> {
    const token = sessionStorage.getItem('Session-Token');

    return new Promise((resolve) => {
      this.apidata.verifyToken(token)
        .pipe(
          takeUntil(this.unsubscribe)
        ).subscribe({
          next: () => {
            this.authenticated = true;
            resolve(this.authenticated);
          },
          error: () => {
            console.log("Não foi possível processar sua requisição");
            resolve(false);
          }
        });
    });
  }

  logout(): void {
    sessionStorage.removeItem('Session-Token');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
