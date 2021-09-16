/** AtlasJS ORM Module Settings */
export type RESTConfig = {
  details: boolean,
}

/** AtlasJS REST getError Options Method Options **/
export type RESTGetErrorOptions = {
  // Requisition status number
  readonly statusCode?: number,
  /** What information adds to the dynamic parts of the message */
  readonly bind?: {},
  /** The original error */
  readonly error?: Error | unknown,
}

/** AtlasJS REST getError Options Method Options **/
export type RESTError = {
  // Requisition status number
  readonly statusCode: number,
  /** Error id */
  readonly errorId: string,
  /** Error message */
  readonly message: string,
  /** Error Details */
  readonly details?: {},
}