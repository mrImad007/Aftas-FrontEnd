import { TestBed } from '@angular/core/testing';

import { MemberServices } from './member-services.service';

describe('MemberServices', () => {
  let service: MemberServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
