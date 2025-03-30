import { Component } from '@angular/core';
import { MercadopagoService } from '../../services/mercadopago.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  products =  [
    {
      id: '1',
      title: 'Throwback Hip Bag',
      currency_id: "MXN",
      picture_url: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      color: 'salmon',
      quantity: 1,
      unit_price: 90,
      description: '',
      category_id: 'bags'
    },
    {
      id: '2',
      title: 'Medium Stuff Satchel',
      currency_id: "MXN",
      picture_url: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      color: 'blue',
      quantity: 1,
      unit_price: 32,
      description: '',
      category_id: 'bags'
    },
  ];
  paymentLink: string | null = null;

  constructor(private mercadoPago: MercadopagoService) {}

  generatePaymentLink(): void {
    this.mercadoPago.createPaymentLink(this.products).subscribe({
      next: (res) => {
        console.log('createPaymentLink response', res)
        this.paymentLink = res.paymentLink;
        this.goToPayment();
      },
      error: (err) => console.error('Error generando el link:', err)
    });
  }

  goToPayment(): void {
    if (this.paymentLink) {
      this.mercadoPago.redirectToPayment(this.paymentLink);
    }
  }
}
