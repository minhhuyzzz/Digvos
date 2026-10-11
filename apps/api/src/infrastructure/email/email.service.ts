import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(to: string, subject: string, content: string): Promise<boolean> {
    const resendApiKey = this.configService.get<string>('RESEND_API_KEY') || process.env.RESEND_API_KEY;

    if (resendApiKey) {
      this.logger.log(`[Resend] Sending email to: ${to} | Subject: ${subject}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'DIGVOS <onboarding@resend.dev>',
            to: [to],
            subject: subject,
            html: content,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const resJson = await response.json() as any;
        if (response.ok) {
          this.logger.log(`[Resend] Email sent successfully to ${to}. ID: ${resJson.id}`);
          return true;
        } else {
          this.logger.error(`[Resend] API error sending to ${to}: ${JSON.stringify(resJson)}`);
        }
      } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          this.logger.error(`[Resend] Request timed out after 5s sending to ${to}`);
        } else {
          this.logger.error(`[Resend] Network error sending to ${to}: ${error.message}`);
        }
      }
    }

    // Fallback sang MailerService (SMTP)
    this.logger.log(`[Mailer] Fallback: Sending email to: ${to}`);
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: content,
      });
      this.logger.log(`[Mailer] Sent successfully to ${to}`);
      return true;
    } catch (error: any) {
      this.logger.error(`[Mailer] Failed to send to ${to}: ${error.message}`);
      
      // Fallback in ra console cho local dev
      this.logger.warn(`\n==================================================\n[LOCAL DEV EMAIL] TO: ${to}\nSUBJECT: ${subject}\nCONTENT: ${content}\n==================================================\n`);
      return true; // Trả về true để không làm nghẽn luồng xử lý chính
    }
  }
}
