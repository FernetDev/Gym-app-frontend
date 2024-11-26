import { TestBed } from '@angular/core/testing';

import { AddMemberService } from './member.service';
describe('AddMemberService', () => {
  let service: AddMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
