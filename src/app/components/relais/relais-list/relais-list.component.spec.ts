import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelaisListComponent } from './relais-list.component';

describe('RelaisListComponent', () => {
  let component: RelaisListComponent;
  let fixture: ComponentFixture<RelaisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelaisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelaisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
