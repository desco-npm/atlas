// Third party resources
import '../lib/colors'
import cliHeader from "../lib/cliHeader" 

// Matters Framework Resources
import objectMap from '../lib/objectMap'
import replaceAll from '../lib/replaceAll'

// Necessary parts
import MessageConfig from './Config'
import { IMessageConfig, IDictionary, EMessagePutOptions, EMessageColorType, } from './types'

/** AtlasJS Message Module */
class Message {
  /** Message settings */
  protected Config = MessageConfig

  /**
   * Configures the AtlasJS Message Module
   * 
   * @param config Configures the AtlasJS Message Module
   **/
  config (config: IMessageConfig | undefined): this {
    // Arrow settings
    this.Config.set(config)

    return this
  }

  /** Write the header */
  header (): void {
    cliHeader({
      title: 'AtlasJS v' + require('../../package.json').version,
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
  put (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    // Generates message level tab according to configuration
    const tab = ''.padStart((options?.level || 1)  * this.Config.get('tab'), ' ')

    // Retrieves message from the dictionary, according to the language defined in the settings
    let text = tab + dictionary[this.Config.get('lang')][id]

    // Exchange variables by informed values
    objectMap(options?.bind || {}, (replaceThis, withThis) => {
      text = replaceAll(text, `[[${withThis}]]`, replaceThis)
    })

    // A type was informed, format accordingly
    if (options?.type) {
      console.log(text[options?.type])
    }
    else {
      console.log(text)
    }
  }

  /**
   * Write a successful message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  success (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: EMessageColorType.success, })
  }

  /**
   * Write an error message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  error (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: EMessageColorType.error, })
  }

  /**
   * Write an alert message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  warning (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: EMessageColorType.warning, })
  }

  /**
   * Write an information message
   *
   * @param id Message ID within the Dictionary of Module Messages
   * @param dictionary Module Message Dictionary
   * @param options Extra options
   **/
  info (id: string, dictionary: IDictionary, options?: EMessagePutOptions): void {
    this.put(id, dictionary, { ...options, type: EMessageColorType.success, })
  }
}

export default new Message()