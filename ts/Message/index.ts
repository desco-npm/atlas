// Framework resources
import '../lib/colors'
import cliHeader from "../lib/cliHeader" 
import objectMap from '../lib/objectMap'
import replaceAll from '../lib/replaceAll'

// Necessary parts
import MessageConfig from './Config'

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

/** Messages in Languages */
export interface IDictionary {
  ptbr: {},
  en: {},
}

/** Languages supported by AtlasJS */
export enum EMessageLangs  {
  /** Portugês Brasileiro */
  ptbr = 'ptbr',
  /** American English */
  en = 'en',
}

/** AtlasJS Message Module Settings */
export interface IMessageConfig { 
  /** Language in use */
  lang?: EMessageLangs,
  /** How many retreat spaces to each message level */
  tab?: number,
};

/** Colors by message type */
export enum EMessageColorType  {
  success = 'green',
  error = 'red',
  warning = 'yellow',
  cyan = 'info',
}

/** AtlasJS Message Put Method Options **/
export interface EMessagePutOptions  {
  /** How many levels of identification that the message should have */
  level?: number,
  /** Message type  */
  type?: EMessageColorType,
  /** What information adds to the dynamic parts of the message */
  bind?: {}
}

export default new Message()