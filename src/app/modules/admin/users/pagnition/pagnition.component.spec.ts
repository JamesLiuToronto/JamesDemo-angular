import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagnitionComponent } from './pagnition.component';

describe('PagnitionComponent', () => {
  let component: PagnitionComponent;
  let fixture: ComponentFixture<PagnitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagnitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagnitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
