import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { WelcomeHeaderComponent } from './welcome-header/welcome-header.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WelcomeFooterComponent } from './welcome-footer/welcome-footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { RefundAndCancellationComponent } from './refund-and-cancellation/refund-and-cancellation.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketPaymentComponent } from './ticket-payment/ticket-payment.component';
// import { QrCodeModule } from 'ng-qrcode';
// import { QrCodeModule } from 'ng-qrcode';
// import { QRCodeModule } from 'angularx-qrcode';
import { QRCodeModule } from 'angular2-qrcode';
import { TicketComponent } from './ticket/ticket.component';
import { ThankuComponent } from './thanku/thanku.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
@NgModule({
  declarations: [
    WelcomeComponent,
    WelcomeHeaderComponent,
    WelcomePageComponent,
    AboutUsComponent,
    WelcomeFooterComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    RefundAndCancellationComponent,
    AddTicketComponent,
    TicketPaymentComponent,
    TicketComponent,
    ThankuComponent,
    PaymentFailedComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule
    // QRCodeModule,
    // QrCodeModule

  ]
})
export class WelcomeModule { }
