import { Component, OnInit, signal } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { SearchProvider } from '../../../models/enums/search-provider.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'search-dialog',
  imports: [DialogWindowComponent, CommonModule, FormsModule],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss',
})
export class SearchDialogComponent implements OnInit {
  searchTerm = signal<string>('');

  private selectedProvider = signal<SearchProvider>(SearchProvider.GOOGLE);

  constructor(private readonly searchService: SearchService) {}

  ngOnInit(): void {
    this.selectProvider('google');
  }

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

  /** Sets the local searchProvider signal to a new provider.
   *
   * The passed string is used to set the provider signal using a SearchProvider enum.
   * Valid options are currently 'google', 'amazon', 'youtube', 'stack_overflow', or 'wikipedia'.
   *
   * @param {string} key New search provider token, used to set the new provider.
   */
  selectProvider(key: string): void {
    // Find all search provider buttons.
    const allBtns = document.querySelectorAll('.provider-btn');

    // Remove the 'active' CSS class.
    allBtns.forEach((btn) => btn.classList.remove('active'));

    // Find our newly selected search provider button using the querySelector stored in the provider map entry matching the passed key.
    const element = document.querySelector(
      this.searchProviderMap[key].querySelector
    );

    // Apply the 'active' CSS class.
    element?.classList.add('active');

    // Set the search provider signal using the selected option.
    this.selectedProvider.set(this.searchProviderMap[key].provider);
  }

  /** Calls the search service to launch a search using the selected provider and entered search term. */
  launchSearch(): void {
    if (this.searchTerm() !== '') {
      this.searchService.launchSearch(
        this.selectedProvider(),
        this.searchTerm()
      );
    }
  }

  /** Clears any entered text in the input field. */
  clearSearchTerm(): void {
    if (this.searchTerm() !== '') {
      this.searchTerm.set('');
    }
  }
}
