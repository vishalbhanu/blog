import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedeleteComponent } from './createdelete.component';

describe('CreatedeleteComponent', () => {
  let component: CreatedeleteComponent;
  let fixture: ComponentFixture<CreatedeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
