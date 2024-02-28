import { TestBed } from '@angular/core/testing';

import { AdherantGuardGuard } from './adherant-guard.guard';

describe('AdherantGuardGuard', () => {
  let guard: AdherantGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdherantGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
