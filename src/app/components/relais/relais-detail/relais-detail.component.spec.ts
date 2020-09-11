import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelaisDetailComponent } from './relais-detail.component';

describe('RelaisDetailComponent', () => {
  let component: RelaisDetailComponent;
  let fixture: ComponentFixture<RelaisDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelaisDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelaisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
