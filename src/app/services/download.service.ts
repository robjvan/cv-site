import { Injectable, signal, WritableSignal } from '@angular/core';
import { ISkillMetric } from '../models/skill-metric.interface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // For table generation
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { IpService } from './ip.service';

/**
 * Service to generate downloadable PDFs of skill summaries, including user IP and timestamp.
 * Integrates with external libraries like jsPDF and moment.js for formatting.
 */
@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  /** Subject used for cleaning up RxJS subscriptions on teardown. */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Constructor to inject the IP service.
   *
   * @param ipService - Service to retrieve the user's IP address.
   */
  constructor(private readonly ipService: IpService) {}

  /**
   * Generates a downloadable PDF of skill summaries.
   * Includes:
   * - User's skill categories
   * - A summary text (user-written)
   * - User's IP address and timestamp
   *
   * @param categories - Object mapping skill group names to arrays of skill details.
   * @param summaryText - User-written summary text to include in the PDF.
   */
  public downloadSkillsPdf(
    categories: Record<string, ISkillMetric[]>,
    summaryText: string
  ): void {
    const doc = new jsPDF();

    // Add title to the PDF
    doc.setFontSize(22);
    doc.text('Rob Vandelinder Skills Summary', 14, 16);

    // Add summary text (limit width to 190 to fit on a single line)
    doc.setFontSize(12);
    doc.text(summaryText, 10, 28, {
      maxWidth: 190, // Set a maximum width for the text
    });

    // Add skill categories as tables
    Object.entries(categories).forEach(([title, data], index) => {
      const startY = (doc as any).lastAutoTable
        ? (doc as any).lastAutoTable.finalY + 10 // Start Y position for the next table
        : 124; // Start Y position for the first table

      // Section title
      doc.setFontSize(16);
      doc.text(title, 10, startY);

      // Add skill list as a table
      autoTable(doc, {
        pageBreak: 'auto', // Automatically add page breaks
        startY: startY + 5,
        head: [['Skill', 'Value']],
        body: data.map((skill) => [skill.title, `${skill.value}/10`]),
      });
    });

    const userIp: string | undefined = this.ipService.getPublicIpAddress();

    // Footer with timestamp and IP address
    doc.setFontSize(12);
    const formattedDate =
      'Generated ' + moment().format('MMMM Do YYYY, h:mm:ss a') + userIp
        ? ' | IP: ' + userIp
        : '';

    doc.text(formattedDate, 10, doc.internal.pageSize.getHeight() - 10);

    // Open the PDF in a new window
    doc.output('dataurlnewwindow');

    // .pipe(takeUntil(this.destroy$))
    // .subscribe((res: any) => {
    //   this.userIp = res.ip;

    //   const doc = new jsPDF();

    //   // Add title to the PDF
    //   doc.setFontSize(22);
    //   doc.text('Rob Vandelinder Skills Summary', 14, 16);

    //   // Add summary text (limit width to 190 to fit on a single line)
    //   doc.setFontSize(12);
    //   doc.text(summaryText, 10, 28, {
    //     maxWidth: 190, // Set a maximum width for the text
    //   });

    //   // Add skill categories as tables
    //   Object.entries(categories).forEach(([title, data], index) => {
    //     const startY = (doc as any).lastAutoTable
    //       ? (doc as any).lastAutoTable.finalY + 10 // Start Y position for the next table
    //       : 124; // Start Y position for the first table

    //     // Section title
    //     doc.setFontSize(16);
    //     doc.text(title, 10, startY);

    //     // Add skill list as a table
    //     autoTable(doc, {
    //       pageBreak: 'auto', // Automatically add page breaks
    //       startY: startY + 5,
    //       head: [['Skill', 'Value']],
    //       body: data.map((skill) => [skill.title, `${skill.value}/10`]),
    //     });
    //   });

    //   // Footer with timestamp and IP address
    //   doc.setFontSize(12);
    //   const formattedDate =
    //     'Generated ' +
    //     moment().format('MMMM Do YYYY, h:mm:ss a') +
    //     ' | IP: ' +
    //     this.userIp;

    //   doc.text(formattedDate, 10, doc.internal.pageSize.getHeight() - 10);

    //   // Open the PDF in a new window
    //   doc.output('dataurlnewwindow');
    // });
  }
}
