import Atlas from '../index'
import { EMessageLangs } from '../Message/types'

Atlas
  .config({ Message: { lang: EMessageLangs.ptbr, }, })
  .start()