import { TestBed } from '@angular/core/testing';

import { AccesoService } from './auth.service';

describe('AuthService', () => {
  let service: AccesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});