// Framework Modules
import Message from '../Message'

// Necessary parts
import ExceptionConfig from './Config'
import { IDictionary, } from '../Message'

/** AtlasJS Exception Module */
class Exception {
  /** Exception settings */
  protected Config = ExceptionConfig

  /**
   * Configures the AtlasJS Exception Module
   * 
   * @param config Configures the AtlasJS Exception Module
   **/
     config (config: IExceptionConfig | undefined): this {
      // Set settings
      this.Config.set(config)
  
      return this
    }

    /**
     * Executes an exception, displaying the proper message and finalizing the execution of the
     * program
     * 
     * error Error id
     * Error Error Object Returned by Node
     */
    discharge (id: string, e: Error, dictionary: IDictionary): void {
      Message.error(id + 'Title', dictionary)
      Message.error(id + 'Message', dictionary)

      process.exit()
    }
}

/** AtlasJS Exception Module Settings */
export interface IExceptionConfig { 
};

export default new Exception()