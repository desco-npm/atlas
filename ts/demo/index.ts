import Atlas from '../index'

import router from './routers/index'

Atlas
  .config({
    Message: { lang: 'ptbr', },
    Server: { router, },
  })
  .start()