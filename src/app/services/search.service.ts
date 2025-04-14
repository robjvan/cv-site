import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { SearchProvider } from '../models/enums/search-provider.enum';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  provider = new BehaviorSubject<SearchProvider>(SearchProvider.GOOGLE);

  setProvider(provider: SearchProvider) {
    this.provider.next(provider);
  }

  launchSearch(provider: SearchProvider, query: string) {
    switch (provider) {
      case SearchProvider.GOOGLE:
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
        break;
      case SearchProvider.AMAZON:
        window.open(`https://www.amazon.ca/s?k=${query}`, '_blank');
        break;
      case SearchProvider.STACK_OVERFLOW:
        window.open(`https://stackoverflow.com/search?q${query}`, '_blank');
        break;
      case SearchProvider.YOUTUBE:
        window.open(
          `https://www.youtube.com/results?search_query=${query}`,
          '_blank'
        );
        break;
      case SearchProvider.WIKIPEDIA:
        window.open(`https://en.wikipedia.org/wiki/${query}`, '_blank');
        break;
    }
  }
}
