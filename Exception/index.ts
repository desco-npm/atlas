// Framework Modules
import Message from '../Message'

// Types
import { ExceptionConfig, } from './types'
import { Dictionary, } from '../Dictionary/types'

// Necessary parts
import ModuleConfig from './Config'

/** AtlasJS Exception Module */
class Exception {
  /** Exception settings */
  protected Config = ModuleConfig
    /**
     * Configures the AtlasJS Exception Module
     * 
     * @param config Configures the AtlasJS Exception Module
     **/
    config (config: ExceptionConfig | undefined): this {
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
    discharge (id: string, dictionary: Dictionary, e: Error): void {
      Message.breakLine()
      Message.error(id + 'Title', dictionary, { format: [ 'bold', ]})
      Message.error(id + 'Message', dictionary)
      Message.breakLine()

      if(this.Config.get('details')) {
        console.log(e)
      }

      process.exit()
    }
}

export default new Exception()