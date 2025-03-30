import { Routes } from '@angular/router';
import { SuccessComponent } from './pages/success/success.component';
import { PendingComponent } from './pages/pending/pending.component';
import { FailureComponent } from './pages/failure/failure.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
  {path: 'success', component: SuccessComponent},
  {path: 'pending', component: PendingComponent},
  {path: 'failure', component: FailureComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: '', redirectTo: 'checkout', pathMatch: 'full'}
];
