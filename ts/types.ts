import { IMessageConfig, } from './Message/types'
import { IServerConfig, } from './Server/types'

export interface IAtlasConfig {
  Message?: IMessageConfig,
  Server?: IServerConfig
}