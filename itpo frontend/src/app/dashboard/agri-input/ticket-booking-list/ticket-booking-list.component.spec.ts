import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBookingListComponent } from './ticket-booking-list.component';

describe('TicketBookingListComponent', () => {
  let component: TicketBookingListComponent;
  let fixture: ComponentFixture<TicketBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketBookingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
