import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketShellComponent } from './basket-shell.component';

describe('CartShellComponent', () => {
  let component: BasketShellComponent;
  let fixture: ComponentFixture<BasketShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
