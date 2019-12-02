import { TestBed } from '@angular/core/testing';

import { GenerateUrlService } from './generate-url.service';

describe('GenerateUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateUrlService = TestBed.get(GenerateUrlService);
    expect(service).toBeTruthy();
  });
});
