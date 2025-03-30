import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  private backendUrl = '/create-payment-link';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  createPaymentLink(paymentData: any): Observable<{ paymentLink: string }> {
    const body = {
      products: paymentData
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ paymentLink: string }>(`${this.backendUrl}`, body , {headers} );
  }

  redirectToPayment(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = url;
    }
  }

}
