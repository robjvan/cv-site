import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { SearchProvider } from '../../../models/enums/search-provider.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';

/**
 * SearchDialogComponent provides a user interface for launching external searches
 * (e.g., Google, Amazon, Stack Overflow) from within the application.
 *
 * Users can enter a search term, choose a provider, and trigger a search via the
 * injected SearchService. This component includes support for changing providers
 * dynamically and managing visual active states via DOM class manipulation.
 */
@Component({
  selector: 'search-dialog',
  imports: [DialogWindowComponent, CommonModule, FormsModule],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss',
})
export class SearchDialogComponent implements OnInit {
  /**
   * Signal to track the current user-entered search term.
   * Bound to the input field for real-time updates.
   */
  public searchTerm: WritableSignal<string> = signal<string>('');

  /**
   * Signal to track the currently selected search provider.
   * Defaults to Google on initialization.
   */
  private selectedProvider: WritableSignal<SearchProvider> =
    signal<SearchProvider>(SearchProvider.GOOGLE);

  /**
   * Constructor injects the SearchService used to launch external searches.
   *
   * @param {SearchService} searchService - Provides methods to launch searches via different providers.
   */
  constructor(private readonly searchService: SearchService) {}

  /**
   * Angular lifecycle hook that initializes the default selected provider.
   */
  ngOnInit(): void {
    this.selectProvider('google');
  }

  /**
   * Mapping of provider keys to their corresponding SearchProvider enums
   * and button selectors for DOM activation toggling.
   */
  private readonly searchProviderMap: Record<
    string,
    { provider: SearchProvider; querySelector: string }
  > = {
    google: { provider: SearchProvider.GOOGLE, querySelector: '#google-btn' },
    amazon: { provider: SearchProvider.AMAZON, querySelector: '#amazon-btn' },
    youtube: {
      provider: SearchProvider.YOUTUBE,
      querySelector: '#youtube-btn',
    },
    stack_overflow: {
      provider: SearchProvider.STACK_OVERFLOW,
      querySelector: '#stack-btn',
    },
    wikipedia: {
      provider: SearchProvider.WIKIPEDIA,
      querySelector: '#wikipedia-btn',
    },
  };

  /**
   * Sets the current provider based on the passed string key.
   *
   * Updates the visual state of buttons and the selected provider signal.
   *
   * @param {string} key - The string identifier for the provider (e.g., 'google', 'amazon').
   */
  public selectProvider(key: string): void {
    // Remove the 'active' class from all provider buttons
    const allBtns = document.querySelectorAll('.provider-btn');
    allBtns.forEach((btn) => btn.classList.remove('active'));

    // Add the 'active' class to the currently selected button
    const element = document.querySelector(
      this.searchProviderMap[key].querySelector
    );
    element?.classList.add('active');

    // Update the signal with the newly selected provider
    this.selectedProvider.set(this.searchProviderMap[key].provider);
  }

  /**
   * Launches a search using the current provider and entered search term.
   *
   * Delegates execution to the SearchService.
   */
  public launchSearch(): void {
    if (this.searchTerm() !== '') {
      this.searchService.launchSearch(
        this.selectedProvider(),
        this.searchTerm()
      );
    }
  }

  /**
   * Clears the current search term input.
   * Only clears if a value is present.
   */
  public clearSearchTerm(): void {
    if (this.searchTerm() !== '') {
      this.searchTerm.set('');
    }
  }
}
