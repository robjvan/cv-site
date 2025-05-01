import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchProvider } from '../models/enums/search-provider.enum';

/**
 * SearchService handles launching search queries across multiple providers.
 *
 * Providers include Google, Amazon, Stack Overflow, YouTube, and Wikipedia.
 * It manages the active provider state reactively and opens queries in a new browser tab.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  /**
   * Reactive state for the currently selected search provider.
   * This is primarily used for UI bindings and query routing.
   */
  public provider: BehaviorSubject<SearchProvider> =
    new BehaviorSubject<SearchProvider>(SearchProvider.GOOGLE);

  /**
   * Updates the current active search provider.
   *
   * @param provider - New provider to use (e.g., GOOGLE, YOUTUBE, etc.).
   */
  public setProvider(provider: SearchProvider) {
    this.provider.next(provider);
  }

  /**
   * Maps each SearchProvider enum to a corresponding URL-building function.
   * The function takes a search string and returns a complete search URL.
   */
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

  /**
   * Launches a new browser tab with the constructed search URL
   * based on the selected provider and given search term.
   *
   * @param {SearchProvider} provider - The search provider to use.
   * @param {string} query - The user-entered search term.
   */
  public launchSearch(provider: SearchProvider, query: string) {
    const url = this.searchUrlMap[provider];

    if (url) {
      const encodedQuery = encodeURIComponent(query);
      window.open(url(encodedQuery), '_blank');
    }
  }
}
