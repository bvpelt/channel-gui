import { TestBed, inject } from '@angular/core/testing';

import { ChannelchangedService } from './channelchanged.service';

describe('ChannelchangedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelchangedService]
    });
  });

  it('should be created', inject([ChannelchangedService], (service: ChannelchangedService) => {
    expect(service).toBeTruthy();
  }));
});
