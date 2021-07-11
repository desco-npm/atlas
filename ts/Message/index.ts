/* O módulo de mensagens */

// Recursos de terceiros
import '../lib/colors'
import cliHeader from "../lib/cliHeader" 

// Importa recursos do framework
import objectMap from '../lib/objectMap'
import replaceAll from '../lib/replaceAll'

// Partes necessárias
import MessageConfig from './Config'
import { IMessageConfig, IDictionary, EMessagePutOptions, EMessageColorType, } from './types'

class Message {
  protected Config = MessageConfig // As configurações das mensagens

  // Configura o servidor
  config (config: IMessageConfig | undefined): this {
    // Seta as configurações
    this.Config.set(config)

    return this
  }

  // Escreve o cabeçalho
  header (): void {
    cliHeader({
      title: 'AtlasJS v' + require('../../package.json').version,
      size: 29,
      align: 'center',
    })
  }

  // Escreve uma mensagem
  put (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    const tab = ''.padStart((options?.level || 1)  * this.Config.get('tab'), ' ')
    let text = tab + dictionary[this.Config.get('lang')][id]

    objectMap(options?.bind || {}, (replaceThis, withThis) => {
      text = replaceAll(text, `[[${withThis}]]`, replaceThis)
    })

    if (options?.type) {
      console.log(text[options?.type])
    }
    else {
      console.log(text)
    }
  }

  // Escreve uma mensagem de sucesso
  success (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: EMessageColorType.success, })
  }

  // Escreve uma mensagem de erro
  error (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: EMessageColorType.error, })
  }

  // Escreve uma mensagem de alerta
  warning (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: EMessageColorType.warning, })
  }

  // Escreve uma mensagem de informação
  info (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: EMessageColorType.success, })
  }
}

export default new Message()