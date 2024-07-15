import { TestBed } from '@angular/core/testing';

import { TrackerServiceService } from './tracker-service.service';

describe('TrackerServiceService', () => {
  let service: TrackerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
