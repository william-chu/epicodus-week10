import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDisplayComponent } from './chat-display.component';

describe('ChatDisplayComponent', () => {
  let component: ChatDisplayComponent;
  let fixture: ComponentFixture<ChatDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
