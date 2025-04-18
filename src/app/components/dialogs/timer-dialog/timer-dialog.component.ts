import {
  Component,
  ElementRef,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { CommonModule } from '@angular/common';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'timer-dialog',
  imports: [DialogWindowComponent, CommonModule, NgbProgressbar],
  templateUrl: './timer-dialog.component.html',
  styleUrl: './timer-dialog.component.scss',
})
export class TimerDialogComponent {
  alarmAudioRef = viewChild<ElementRef>('alarmAudio');

  public showToast: boolean = false;

  /** Holds the index of the currently selected timer.
   *
   * Used for UI state and to identify the selected duration from `timerMap`.
   */
  private selectedTimerIndex: WritableSignal<number | undefined> = signal<
    number | undefined
  >(undefined);

  /** Reference to the currently running timer interval. */
  private timer: any;

  public isPaused: boolean = false;
  public isRunning: boolean = false;
  // public showResetToast: boolean = false;
  public isReset: boolean = true;
  public timerCompleted: boolean = false;

  /** Stores the maximum duration of the current timer.
   *
   * Used for calculating progress bar values.
   */
  private maxDuration: WritableSignal<number> = signal<number>(0);

  /** Mapping of preset timer durations in milliseconds.
   * Keys are indices used for user selection.
   */
  private timerMap: Record<number, number> = {
    0: 3000, // 1 mins in milliseconds
    // 0: 60000, // 1 minute in milliseconds
    1: 300000, // 5 minutes
    2: 900000, // 15 minutes
    3: 1800000, // 30 minutes
    4: 3600000, // 60 minutes
  };

  /** Signal representing the remaining time in milliseconds. */
  public time: WritableSignal<number> = signal<number>(0);

  private handleTimerComplete(): void {
    this.timerCompleted = true; // Block Start/Pause
    this.showToast = true;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.showToast = false;
    }, 5000);

    // Play audio
    const audio = this.alarmAudioRef()?.nativeElement;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((err: any) => {
        console.warn('Audio failed to play:', err.message);
      });
    }
  }

  /** Selects a timer duration from the preset list based on index.
   * Resets the current time and sets the maximum duration.
   *
   * @param index Index of the timer to select
   */
  public selectTimer(index: number): void {
    this.selectedTimerIndex.set(index);
    this.time.set(this.timerMap[index]);
    this.maxDuration.set(this.timerMap[index]);
    this.isReset = false; // Mark that user has selected a timer
  }

  /** Checks if the given timer index is currently active/selected.
   * Used to highlight the active timer button in the UI.
   *
   * @param index Index to check
   * @returns True if the timer is active
   */
  public activeTimer(index: number): boolean {
    return this.selectedTimerIndex() === index;
  }

  /** Returns a formatted string representing the remaining time in MM:SS.
   *
   * @returns Formatted string like "4:09"
   */
  public get timeRemaining(): string {
    const min = Math.floor((this.time() / 1000 / 60) << 0);
    let sec = Math.floor((this.time() / 1000) % 60);
    return sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`;
  }

  /** Starts the countdown timer, decreasing `time` by 1 second every tick. */
  public startTimer(): void {
    if (this.isRunning) return; // Prevent duplicate intervals

    this.isPaused = false;
    this.isRunning = true;

    if (this.timer) clearInterval(this.timer);

    this.timer = setInterval(() => {
      const currentTime = this.time();

      // Decrement first
      const newTime = currentTime - 1000;
      this.time.set(newTime);

      // If new time is zero or below, stop timer and trigger complete
      if (newTime <= 0) {
        clearInterval(this.timer);
        this.isRunning = false;
        this.handleTimerComplete();
      }
    }, 1000);
  }

  public pauseTimer(): void {
    if (!this.isRunning) return;

    this.isPaused = true;
    this.isRunning = false;
    clearInterval(this.timer);
  }

  public togglePause(): void {
    this.isPaused ? this.startTimer() : this.pauseTimer();
  }

  /** Stops the currently running timer interval. */
  public stopTimer(): void {
    clearTimeout(this.timer);
    this.isRunning = false;
    this.isPaused = false;
  }

  /** Returns the maximum time in milliseconds for the selected timer.
   * Useful for calculating progress percentages.
   */
  public get maxTime(): number {
    return this.maxDuration();
  }

  public resetTimer(): void {
    clearInterval(this.timer);
    this.isRunning = false;
    this.isPaused = false;
    this.selectedTimerIndex.set(undefined);
    this.time.set(0);
    this.isReset = true; // Enable timer buttons again
    this.timerCompleted = false; // Re-enable timer control buttons
  }
}
