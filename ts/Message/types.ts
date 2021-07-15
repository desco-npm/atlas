/** Messages in Languages */
export type Dictionary = {
  readonly ptbr: {},
  readonly en: {},
}

/** Languages supported by AtlasJS */
type lang  =  'ptbr' |  'en'

/** AtlasJS Message Module Settings */
export type MessageConfig = { 
  /** Language in use */
  readonly lang?: lang,
  /** How many retreat spaces to each message level */
  readonly tab?: number,
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
  readonly level?: number,
  /** Message type  */
  readonly type?: MessageColorType,
  /** What information adds to the dynamic parts of the message */
  readonly bind?: {}
}