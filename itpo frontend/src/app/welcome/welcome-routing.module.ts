import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { RefundAndCancellationComponent } from './refund-and-cancellation/refund-and-cancellation.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketPaymentComponent } from './ticket-payment/ticket-payment.component';
import { TicketComponent } from './ticket/ticket.component';
import { ThankuComponent } from './thanku/thanku.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
// import { PaymentGatewayComponent } from '../payment-gateway/payment-gateway.component';
const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'refund-cancellation', component: RefundAndCancellationComponent },
  { path: 'add-ticket', component: AddTicketComponent },
  // { path: 'pay/:id', component: PaymentGatewayComponent },
  { path: 'ticket/:id', component: TicketComponent },
  { path: 'thankuPage', component: ThankuComponent },
  { path: 'failure', component: PaymentFailedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
