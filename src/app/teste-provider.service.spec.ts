import { TestBed } from '@angular/core/testing';

import { TesteProviderService } from './teste-provider.service';

describe('TesteProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TesteProviderService = TestBed.get(TesteProviderService);
    expect(service).toBeTruthy();
  });
});
