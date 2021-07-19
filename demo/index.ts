import Atlas from '../index'

import router from './routers/index'

Atlas
  .config({
    Message: { lang: 'ptbr', },
    Server: { router, },
    ORM: {
      connection: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345678',
        database: 'diasrafael',
        entities: [ './entities/*.ts', ],
        synchronize: true,
      },
    },
    Mail: {
      service: 'gmail',
      auth: {
        user: 'eu@diasrafael.com.br',
        pass: 'r1478953DGG',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }
  })
  .start()