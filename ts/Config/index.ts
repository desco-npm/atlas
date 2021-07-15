// Framework resources
import objectPath from '../lib/objectPath'

/** AtlasJS Settings Module */
class Config {
  /** Default settings */
  private defaults = {}

  /** Settings defined */
  private configs = {}

  /**
   * Set the default settings
   * 
   * @param defaults: Default settings to be added to the module
   **/
  setDefaults (defaults: {}): this {
    this.defaults = defaults // Sets the standards

    this.set(this.configs) // Add defaults to settings

    return this
  }

  /**
   * Set the settings
   * 
   * @param configs Settings to be added to the module
   **/
  set (configs: {} | undefined): this {
    this.configs = { ...this.defaults, ...configs, } // Merge user settings with defaults

    return this
  }

  /**
   * Returns a Configuration
   * @param path Address of the configuration you want to access.Use points to access levels deeper
   */
  get (path: string): any {
    return objectPath.get(this.configs, path)
  }
}

export default Config