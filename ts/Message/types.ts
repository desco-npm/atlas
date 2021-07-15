/** Messages in Languages */
export type Dictionary = {
  ptbr: {},
  en: {},
}

/** Languages supported by AtlasJS */
type lang  =  'ptbr' |  'en'

/** AtlasJS Message Module Settings */
export type MessageConfig = { 
  /** Language in use */
  lang?: lang,
  /** How many retreat spaces to each message level */
  tab?: number,
};

/** Colors by message type */
export enum MessageColorType {
  success = 'green',
  error = 'red',
  warning = 'yellow',
  cyan = 'info',
}

/** AtlasJS Message Put Method Options **/
export type MessagePutOptions = {
  /** How many levels of identification that the message should have */
  level?: number,
  /** Message type  */
  type?: MessageColorType,
  /** What information adds to the dynamic parts of the message */
  bind?: {}
}