import SMTPTransport from 'nodemailer/lib/smtp-transport'

/** Transporter */
export type Transport = SMTPTransport | SMTPTransport.Options

/** Mail Settings Type */
export type MailConfig = Transport | Transport[]

export * from 'nodemailer'