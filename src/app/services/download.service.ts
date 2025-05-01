import { Injectable, signal, WritableSignal } from '@angular/core';
import { ISkillMetric } from '../models/skill-metric.interface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // For table generation
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { IpService } from './ip.service';

/**
 * DownloadService handles generation of downloadable PDF documents for skill summaries.
 *
 * It integrates external libraries like jsPDF, autoTable, and moment.js,
 * and includes contextual information such as IP address and generation timestamp.
 */
@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  /** Subject used for cleaning up RxJS subscriptions on teardown. */
  private destroy$: Subject<void> = new Subject<void>();

  /** Reactive signal to store the user's public IP address. */
  private ipAddress: WritableSignal<string> = signal('');

  /**
   * Constructor injects the IpService for external IP retrieval.
   *
   * @param {IpService} ipService - Provides client IP address via HTTP request.
   */
  constructor(private readonly ipService: IpService) {}

  /**
   * Generates and downloads a PDF document summarizing skill categories
   * and including a personalized overview. Also includes timestamp and IP.
   *
   * @param {Record<string, ISkillMetric[]>} categories - A Record of skill group names and corresponding skill metric arrays.
   * @param {string} summaryText - A user-written professional summary paragraph to include at the top of the PDF.
   */
  public downloadSkillsPdf(
    categories: Record<string, ISkillMetric[]>,
    summaryText: string
  ): void {
    this.ipService
      .getIPAddress()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.ipAddress = res.ip;

        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.text('Rob Vandelinder Skills Summary', 14, 16);

        // Summary section
        doc.setFontSize(12);
        doc.text(summaryText, 10, 28, {
          maxWidth: 190, // Set a maximum width for the text
        });

        // Add categorized skill tables
        Object.entries(categories).forEach(([title, data], index) => {
          const startY = (doc as any).lastAutoTable
            ? (doc as any).lastAutoTable.finalY + 10 // Start Y position for the next table
            : 124; // Start Y position for the first table

          // Section title
          doc.setFontSize(16);
          doc.text(title, 10, startY);

          // Table of skill values
          autoTable(doc, {
            pageBreak: 'auto', // Automatically add page breaks
            startY: startY + 5,
            head: [['Skill', 'Value']],
            body: data.map((skill) => [skill.title, `${skill.value}/10`]),
          });
        });

        // Footer with timestamp and IP address
        doc.setFontSize(12);
        const formattedDate =
          'Generated ' +
          moment().format('MMMM Do YYYY, h:mm:ss a') +
          ' | IP: ' +
          this.ipAddress;

        doc.text(formattedDate, 10, doc.internal.pageSize.getHeight() - 10);

        // Download the PDF
        // doc.save('Skills_Summary.pdf');
        doc.output('dataurlnewwindow');
      });
  }
}
