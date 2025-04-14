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

  /** Sets the local searchProvider signal to a new provider.
   *
   * The passed string is used to set the provider signal using a SearchProvider enum.
   * Valid options are currently 'google', 'amazon', 'youtube', 'stack_overflow', or 'wikipedia'.
   *
   * @param {string} provider New search provider token, used to set the new provider.
   */
  selectProvider(provider: string): void {
    let element;
    const allBtns = document.querySelectorAll('.provider-btn');
    allBtns.forEach((btn) => btn.classList.remove('active'));

    switch (provider) {
      case 'google':
        element = document.querySelector('#google-btn');
        element?.classList.add('active');
        this.selectedProvider.set(SearchProvider.GOOGLE);
        break;
      case 'amazon':
        element = document.querySelector('#amazon-btn');
        element?.classList.add('active');
        this.selectedProvider.set(SearchProvider.AMAZON);
        break;
      case 'youtube':
        element = document.querySelector('#youtube-btn');
        element?.classList.add('active');
        this.selectedProvider.set(SearchProvider.YOUTUBE);
        break;
      case 'stack_overflow':
        element = document.querySelector('#stack-btn');
        element?.classList.add('active');
        this.selectedProvider.set(SearchProvider.STACK_OVERFLOW);
        break;
      case 'wikipedia':
        element = document.querySelector('#wikipedia-btn');
        element?.classList.add('active');
        this.selectedProvider.set(SearchProvider.WIKIPEDIA);
        break;
    }
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
