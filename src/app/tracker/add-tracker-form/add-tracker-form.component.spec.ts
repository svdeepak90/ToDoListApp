import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackerFormComponent } from './add-tracker-form.component';

describe('AddTrackerFormComponent', () => {
  let component: AddTrackerFormComponent;
  let fixture: ComponentFixture<AddTrackerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrackerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTrackerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
