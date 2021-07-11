/** Message Module Types */

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