import { TestBed, inject } from '@angular/core/testing';

import { PrivateDialogService } from './private-dialog.service';

describe('PrivateDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivateDialogService]
    });
  });

  it('should be created', inject([PrivateDialogService], (service: PrivateDialogService) => {
    expect(service).toBeTruthy();
  }));
});
