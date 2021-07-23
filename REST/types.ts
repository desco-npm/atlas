/** AtlasJS ORM Module Settings */
export type RESTConfig = {
  details: Boolean,
}

/** AtlasJS REST getError Options Method Options **/
export type RESTGetErrorOptions = {
  // Requisition status number
  readonly statusCode?: Number,
  /** What information adds to the dynamic parts of the message */
  readonly bind?: {},
  /** The original error */
  readonly error?: Error,
}

/** AtlasJS REST getError Options Method Options **/
export type RESTError = {
  // Requisition status number
  readonly statusCode: Number,
  /** Error id */
  readonly errorId: String,
  /** Error message */
  readonly message: String,
  /** Error Details */
  readonly details?: {},
}