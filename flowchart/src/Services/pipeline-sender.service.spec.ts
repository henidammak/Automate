import { TestBed } from '@angular/core/testing';

import { PipelineSenderService } from './pipeline-sender.service';

describe('PipelineSenderService', () => {
  let service: PipelineSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipelineSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
