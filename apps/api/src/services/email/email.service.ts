import sendgrid from '@sendgrid/mail';
import { renderEmailHtml, Template } from 'mailer';

import config from 'config';

import logger from 'logger';

import { EmailServiceConstructorProps, From, SendSendgridTemplateParams, SendTemplateParams } from './email.types';

class EmailService {
  apiKey: string | undefined;

  from: From;

  constructor({ apiKey, from }: EmailServiceConstructorProps) {
    this.apiKey = apiKey;
    this.from = from;

    if (apiKey) sendgrid.setApiKey(apiKey);
  }

  async sendTemplate<T extends Template>({ to, subject, template, params, attachments }: SendTemplateParams<T>) {
    if (!this.apiKey) {
      logger.error('[Sendgrid] API key is not provided');
      return null;
    }

    const html = await renderEmailHtml({ template, params });

    return sendgrid
      .send({
        from: this.from,
        to,
        subject,
        html,
        attachments,
      })
      .then(() => {
        logger.debug(`[Sendgrid] Sent email to ${to}.`);
        logger.debug({ subject, template, params });
      });
  }
  async sendTemplate1(to: string) {
    if (!this.apiKey) {
      logger.error('[Sendgrid] API key is not provided');
      return null;
    }

    const msg = {
      to: to, // Change to your recipient
      from: this.from, // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    return sendgrid.send(msg).then(() => {
      logger.debug(`[Sendgrid] Sent email to ${to}.`);
    });
  }

  async sendSendgridTemplate({
    to,
    subject,
    templateId,
    dynamicTemplateData,
    attachments,
  }: SendSendgridTemplateParams) {
    if (!this.apiKey) {
      logger.error('[Sendgrid] API key is not provided');
      return null;
    }

    return sendgrid
      .send({
        from: this.from,
        to,
        subject,
        templateId,
        dynamicTemplateData,
        attachments,
      })
      .then(() => {
        logger.debug(`[Sendgrid] Sent email to ${to}.`);
        logger.debug({ subject, templateId, dynamicTemplateData });
      });
  }
}

export default new EmailService({
  apiKey: config.SENDGRID_API_KEY,
  from: {
    email: 'itsmehelloxo@gmail.com',
    name: 'Shopy',
  },
});
