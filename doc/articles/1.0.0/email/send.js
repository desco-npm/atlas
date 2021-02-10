module.exports = {
  lang: 'js',
  content: `
const data = {
  name: 'myMail',
  from: 'my@domain.com',
  to: 'destiny@domain.com',
  cc: 'cc1@domain.com, cc2@domain.com, cc3@domain.com'
  bcc: 'bcc1@domain.com, bcc2@domain.com, bcc3@domain.com'
  subject : 'Example',
  text: 'Content',
  html: 'HTML Content',
  replyTo: 'reply@domain.com',
  attachments: [
    {
        path: '/path/to/file.txt',
    },
  ],
}

const callback = (error, info) => {
  console.log(info)
  
  return error
}

Atlas.Mail.send(data, callback)
  `,
}