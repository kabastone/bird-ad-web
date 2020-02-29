import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdadHomeComponent } from './birdad-home.component';

describe('BirdadHomeComponent', () => {
  let component: BirdadHomeComponent;
  let fixture: ComponentFixture<BirdadHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirdadHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirdadHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
