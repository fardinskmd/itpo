import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedUserListComponent } from './scanned-user-list.component';

describe('ScannedUserListComponent', () => {
  let component: ScannedUserListComponent;
  let fixture: ComponentFixture<ScannedUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
