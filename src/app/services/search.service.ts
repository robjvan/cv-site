import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchProvider } from '../models/enums/search-provider.enum';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  public provider: BehaviorSubject<SearchProvider> =
    new BehaviorSubject<SearchProvider>(SearchProvider.GOOGLE);

  public setProvider(provider: SearchProvider) {
    this.provider.next(provider);
  }

  private readonly searchUrlMap: Record<
    SearchProvider,
    (query: string) => string
  > = {
    [SearchProvider.GOOGLE]: (query) =>
      `https://www.google.com/search?q=${query}`,
    [SearchProvider.AMAZON]: (query) => `https://www.amazon.ca/s?k=${query}`,
    [SearchProvider.STACK_OVERFLOW]: (query) =>
      `https://stackoverflow.com/search?q${query}`,
    [SearchProvider.YOUTUBE]: (query) =>
      `https://www.youtube.com/results?search_query=${query}`,
    [SearchProvider.WIKIPEDIA]: (query) =>
      `https://en.wikipedia.org/wiki/${query}`,
  };

  public launchSearch(provider: SearchProvider, query: string) {
    const url = this.searchUrlMap[provider];

    if (url) {
      const encodedQuery = encodeURIComponent(query);
      window.open(url(encodedQuery), '_blank');
    }
  }
}
