import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MercadopagoService } from './services/mercadopago.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mercadopago-test-payment';
}
