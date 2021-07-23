// Framework Modules
import Dictionary from '../Dictionary'

// Framework resources
import '../lib/colors'
import cliHeader from "../lib/cliHeader" 

// Types
import { MessageConfig, MessagePutOptions, MessageColorType, } from './types'
import { Dictionary as DictionaryType, DictionaryGetOptions } from '../Dictionary/types'

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
  put (id: string, dictionary: DictionaryType, options?: MessagePutOptions): void {
    // Generates message level tab according to configuration
    const tab = ''.padStart((options?.level || 1)  * this.Config.get('tab'), ' ')

    // Symbol to be displayed before message
    const symbol = options?.symbol ? `${options?.symbol} ` : ''

    // Retrieves message from the dictionary, according to the language defined in the settings
    let text = tab + symbol + Dictionary.get(
      id, dictionary, { bind: options?.bind, } as DictionaryGetOptions
    )

    // A type was informed, format accordingly
    if(options?.type) {
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
  success (id: string, dictionary: DictionaryType, options?: MessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: MessageColorType.success, symbol: '[SUC]' })
  }

  /**
   * Write an error message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  error (id: string, dictionary: DictionaryType, options?: MessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: MessageColorType.error, symbol: '[ERR]' })
  }

  /**
   * Write an alert message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  warning (id: string, dictionary: DictionaryType, options?: MessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: MessageColorType.warning, symbol: '[WAR]' })
  }

  /**
   * Write an information message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  info (id: string, dictionary: DictionaryType, options?: MessagePutOptions): void {
    options = options || {} as MessagePutOptions

    this.put(id, dictionary, { ...options, type: MessageColorType.success, symbol: '[INF]', })
  }

  /** Line break */
  breakLine () {
    console.log()
  }
}

export default new Message()