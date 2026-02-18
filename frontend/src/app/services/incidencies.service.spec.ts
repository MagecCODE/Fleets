import { TestBed } from '@angular/core/testing';

import { IncidenciesService } from './incidencies.service';

describe('IncidenciesService', () => {
  let service: IncidenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
