import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadComponent } from './listad.component';

describe('ListadComponent', () => {
  let component: ListadComponent;
  let fixture: ComponentFixture<ListadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
