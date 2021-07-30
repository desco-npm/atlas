/** Languages */
export type Dictionary = {
  readonly ptbr: {},
  readonly en: {},
}

/** Languages supported by AtlasJS */
type lang  =  'ptbr' |  'en'

/** AtlasJS Dictionary Module Settings */
export type DictionaryConfig = { 
  /** Language in use */
  readonly lang?: lang,
};

/** AtlasJS Dictionary Get Method Options **/
export type DictionaryGetOptions = {
  /** What information adds to the dynamic parts of the message */
  readonly bind?: {},
}