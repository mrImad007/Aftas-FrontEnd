import { TestBed } from '@angular/core/testing';

import { MemberService } from './member-services.service';

describe('MemberServices', () => {
  let service: MemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
