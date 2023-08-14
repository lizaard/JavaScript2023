import { TestBed } from '@angular/core/testing';

import { RecipesResolverService } from './recipes-resolver.service';

describe('RecipesResolverService', () => {
  let service: typeof RecipesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
