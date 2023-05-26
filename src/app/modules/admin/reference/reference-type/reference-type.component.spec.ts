import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceTypeComponent } from './reference-type.component';

describe('ReferenceTypeComponent', () => {
  let component: ReferenceTypeComponent;
  let fixture: ComponentFixture<ReferenceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
