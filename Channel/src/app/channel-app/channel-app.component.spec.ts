import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelAppComponent } from './channel-app.component';

describe('ChannelAppComponent', () => {
  let component: ChannelAppComponent;
  let fixture: ComponentFixture<ChannelAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
