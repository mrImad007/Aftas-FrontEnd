import { TestBed } from '@angular/core/testing';

import { JuryGuardGuard } from './jury-guard.guard';

describe('JuryGuardGuard', () => {
  let guard: JuryGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JuryGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
