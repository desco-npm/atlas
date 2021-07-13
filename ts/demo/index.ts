import Atlas from '../index'
import { EMessageLangs } from '../Message/types'
import { IAtlasConfig } from '../types'

import router from './routers/index'

Atlas
  .config({
    Message: { lang: EMessageLangs.ptbr, },
    Server: { router, },
  } as IAtlasConfig)
  .start()