import SMTPTransport from 'nodemailer/lib/smtp-transport'

/** Transporter */
export type Transport = SMTPTransport | SMTPTransport.Options

/** Contact */
export type Contact = { name?: String, mail: String, }

/** Mail Settings Type */
export type MailConfig = Transport | Transport[]

export { Transporter, } from 'nodemailer'