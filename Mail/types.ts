import SMTPTransport from 'nodemailer/lib/smtp-transport'

/** Transporter */
export type Transport = SMTPTransport | SMTPTransport.Options

/** Contact */
export type Contact = { name?: string, mail: string, }

/** Mail Settings Type */
export type MailConfig = Transport | Transport[]

export { Transporter, } from 'nodemailer'