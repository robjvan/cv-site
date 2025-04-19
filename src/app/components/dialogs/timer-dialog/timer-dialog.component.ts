import {
  Component,
  ElementRef,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * TimerDialogComponent is a utility tool that allows users to set and run
 * predefined countdown timers with audio alerts, visual progress, and toast feedback.
 *
 * It supports start, pause, resume, and reset operations.
 */
@Component({
  selector: 'timer-dialog',
  imports: [DialogWindowComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './timer-dialog.component.html',
  styleUrl: './timer-dialog.component.scss',
})
export class TimerDialogComponent {
  /** Template reference to the HTML audio element used for alarm playback. */
  private alarmAudioRef = viewChild<ElementRef>('alarmAudio');

  /** Controls the visibility of a toast alert when the timer completes. */
  public showToast: boolean = false;

  /** Index of the currently selected timer option (from `timerMap`). */
  private selectedTimerIndex: WritableSignal<number | undefined> = signal<
    number | undefined
  >(undefined);

  /** Interval ID for the active timer loop. */
  private timer: any;

  /** State flags for controlling UI button logic. */
  public isPaused: boolean = false;
  public isRunning: boolean = false;
  public isReset: boolean = true;
  public timerCompleted: boolean = false;

  /** Signal holding the full duration of the currently selected timer. */
  private maxDuration: WritableSignal<number> = signal<number>(0);

  /**
   * Lookup map of preset timer durations, defined in milliseconds.
   * The index is used as the UI reference and selection key.
   */
  private timerMap: Record<number, number> = {
    // 0: 3000, // 3 seconds for testing
    0: 30000, // 30 seconds
    1: 60000, // 1 minute
    2: 300000, // 5 minutes
    3: 900000, // 15 minutes
    4: 1800000, // 30 minutes
    5: 3600000, // 60 minutes
  };

  /** Signal tracking the remaining time (in milliseconds). */
  public time: WritableSignal<number> = signal<number>(0);

  /** Signal controlling visibility of the start button. */
  public hideStart = signal(this.time() !== 0);

  /**
   * Called when the timer hits zero.
   * Triggers toast, plays alarm audio, and marks the completion state.
   */
  private handleTimerComplete(): void {
    // Block Start/Pause
    this.timerCompleted = true;
    this.showToast = true;

    // Hide toast after 2.5s
    setTimeout(() => {
      this.showToast = false;
    }, 2500);

    // Play alarm audio
    const audio = this.alarmAudioRef()?.nativeElement;

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((err: any) => {
        console.warn('Audio failed to play:', err.message);
      });
    }
  }

  /**
   * Selects a timer preset by index and sets the duration signals.
   *
   * @param {number} index - Key of the selected timer in `timerMap`.
   */
  public selectTimer(index: number): void {
    this.selectedTimerIndex.set(index);
    this.time.set(this.timerMap[index]);
    this.maxDuration.set(this.timerMap[index]);
    this.isReset = false; // Mark that user has selected a timer
  }

  /**
   * Determines whether the timer preset at the given index is currently active.
   *
   * @param {number} index - Index to check.
   * @returns {boolean} True if this timer is the selected one.
   */
  public activeTimer(index: number): boolean {
    return this.selectedTimerIndex() === index;
  }

  /**
   * Returns the remaining time as a formatted string (MM:SS).
   */
  public get timeRemaining(): string {
    const min = Math.floor((this.time() / 1000 / 60) << 0);
    let sec = Math.floor((this.time() / 1000) % 60);
    return sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`;
  }

  /**
   * Starts or resumes the countdown timer.
   * Decrements the `time` signal every second.
   */
  public startTimer(): void {
    if (this.isRunning) return; // Prevent duplicate intervals

    this.isPaused = false;
    this.isRunning = true;
    this.hideStart.set(true);

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

  /**
   * Pauses the countdown timer.
   */
  public pauseTimer(): void {
    if (!this.isRunning) return;

    this.isPaused = true;
    this.isRunning = false;
    clearInterval(this.timer);
  }

  /**
   * Toggles between pause and resume states.
   */
  public togglePause(): void {
    this.isPaused ? this.startTimer() : this.pauseTimer();
  }

  /**
   * Stops the countdown and clears interval without resetting the UI state.
   */
  public stopTimer(): void {
    clearTimeout(this.timer);
    this.isRunning = false;
    this.isPaused = false;
  }

  /**
   * Resets the timer to its initial state.
   * Also restores UI flags and selected index.
   */
  public resetTimer(): void {
    clearInterval(this.timer);
    this.isRunning = false;
    this.isPaused = false;
    this.selectedTimerIndex.set(undefined);
    this.time.set(0);
    this.isReset = true; // Enable timer buttons again
    this.timerCompleted = false; // Re-enable timer control buttons
    this.hideStart.set(false);
  }

  /**
   * Gets the full duration of the currently selected timer.
   * Useful for calculating percentage progress.
   */
  public get maxTime(): number {
    return this.maxDuration();
  }

  /**
   * Calculates the progress bar percentage as a number (0-100).
   */
  public get progressPercent(): number {
    const progress: number = (this.time() / this.maxDuration()) * 100;
    return progress;
  }
}
