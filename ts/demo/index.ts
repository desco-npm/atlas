import Atlas from '../index'
import { IAtlasConfig } from '../types'

import router from './routers/index'

Atlas
  .config({
    Message: { lang: 'ptbr', },
    Server: { router, },
  } as IAtlasConfig)
  .start()