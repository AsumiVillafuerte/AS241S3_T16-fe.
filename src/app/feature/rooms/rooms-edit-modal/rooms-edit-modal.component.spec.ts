import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditModalComponent } from './rooms-edit-modal.component';

describe('RoomsEditModalComponent', () => {
  let component: RoomEditModalComponent;
  let fixture: ComponentFixture<RoomEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
