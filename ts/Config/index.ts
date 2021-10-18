// Framework resources
import isArray from '../lib/isArray'
import objectPath from '../lib/objectPath'
import { objectMerge, } from '../lib/objectMerge'

/** AtlasJS Settings Module */
class Config {
  /** Default settings */
  private defaults = {}

  /** Settings defined */
  private configs = {}

  /** If it was configured */
  public configured = false

  /**
   * Set the default settings
   * 
   * @param defaults: Default settings to be added to the module
   **/
  setDefaults (defaults: {}): this {
    this.defaults = defaults // Sets the standards

    this.set(this.configs, true) // Add defaults to settings

    return this
  }

  /**
   * Set the settings
   *
   * @param configs Settings to be added to the module
   * @param ignoreConfigured Ignore the setting of the "configured" flag
   **/
  set (configs: {} | undefined, ignoreConfigured: boolean = false): this {
    this.configs = objectMerge(this.defaults, configs, {}) // Merge user settings with defaults

    // Mark as configured
    if (!ignoreConfigured) {
      this.configured = true
    }

    return this
  }

  /**
   * Returns a Configuration
   * @param path Address of the configuration you want to access.Use points to access levels deeper
   * @param params Extra parameters
   */
  get (path?: string, params?: { forceArray?: boolean, }): any {
    if(path) {
      const config = objectPath.get(this.configs, path)

      return params?.forceArray && !isArray(config) ? [ config, ] : config
    }
    else {
      return this.configs
    }
  }
}

export default Config