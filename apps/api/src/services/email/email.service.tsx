import {EmailComponent, Template} from 'mailer';
import React from "react";

import {EmailServiceConstructorProps, From, SendTemplateParams} from './email.types';

class EmailService {
    from: From;

    transporter: number

    constructor({from}: EmailServiceConstructorProps) {
        this.from = from;

        this.transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: "shopy@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });
    }

    async sendTemplate<T extends Template>({to, subject, template, params, attachments}: SendTemplateParams<T>) {
        const EmailTemplate = EmailComponent[template]

        await this.transporter.sendMail({
            from: '"Shopy 👻" <shopy@ethereal.email>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: <EmailTemplate firstName={params.firstName} href={params.href}/>, // html body
        });
    }
}

export default new EmailService({
    from: {
        email: 'notifications@ship.com',
        name: 'Ship',
    },
});
