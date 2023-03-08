import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertokenComponent } from './usertoken.component';

describe('UsertokenComponent', () => {
  let component: UsertokenComponent;
  let fixture: ComponentFixture<UsertokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsertokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
