// Framework resources
import '../lib/colors'
import cliHeader from "../lib/cliHeader" 
import objectMap from '../lib/objectMap'
import replaceAll from '../lib/replaceAll'

// Types
import { MessageConfig, Dictionary, MessagePutOptions, MessageColorType, } from './types'

// Necessary parts
import ModuleConfig from './Config'

/** AtlasJS Message Module */
class Message {
  /** Message settings */
  protected Config = ModuleConfig

  /**
   * Configures the AtlasJS Message Module
   * 
   * @param config Configures the AtlasJS Message Module
   **/
  config (config: MessageConfig | undefined): this {
    // Arrow settings
    this.Config.set(config)

    return this
  }

  /** Write the header */
  header (): void {
    cliHeader({
      title: 'AtlasJS v' + require('../package.json').version,
      size: 29,
      align: 'center',
    })
  }

  /**
   * Write a message
   * 
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  put (id: string, dictionary: Dictionary, options?: MessagePutOptions): void {
    // Generates message level tab according to configuration
    const tab = ''.padStart((options?.level || 1)  * this.Config.get('tab'), ' ')

    // Symbol to be displayed before message
    const symbol = options?.symbol ? `${options?.symbol} ` : ''

    // Retrieves message from the dictionary, according to the language defined in the settings
    let text = tab + symbol + dictionary[this.Config.get('lang')][id]

    // Exchange variables by informed values
    objectMap(options?.bind || {}, (replaceThis, withThis) => {
      text = replaceAll(text, `[[${withThis}]]`, replaceThis)
    })

    // A type was informed, format accordingly
    if (options?.type) {
      text = text[options?.type]
    }

    // Apply extra formats
    options?.format?.map(f => {
      text = text[f]
    })

    // Writing the message
    console.log(text)
  }

  /**
   * Write a successful message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  success (id: string, dictionary: Dictionary, options?: MessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: MessageColorType.success, symbol: '[SUC]' })
  }

  /**
   * Write an error message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  error (id: string, dictionary: Dictionary, options?: MessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: MessageColorType.error, symbol: '[ERR]' })
  }

  /**
   * Write an alert message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  warning (id: string, dictionary: Dictionary, options?: MessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: MessageColorType.warning, symbol: '[WAR]' })
  }

  /**
   * Write an information message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  info (id: string, dictionary: Dictionary, options?: MessagePutOptions): void {
    options = options || {} as MessagePutOptions

    this.put(id, dictionary, { ...options, type: MessageColorType.success, symbol: '[INF]', })
  }

  /** Line break */
  breakLine () {
    console.log()
  }
}

export default new Message()