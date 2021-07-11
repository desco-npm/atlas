// Importa recursos do framework
import objectPath from '../lib/objectPath'

// Classe de configurações
class Config {
  private defaults = {} // Configurações padrões
  private configs = {} // Configurações definidas

  // Seta as configurações padrões
  setDefaults (defaults: {}): this {
    this.defaults = defaults // Define os padrões

    this.set(this.configs) // Adiciona padrões as configurações

    return this
  }

  // Seta as configurações
  set (configs: {} | undefined): this {
    this.configs = { ...this.defaults, ...configs, }

    return this
  }

  // Retorna uma configuração
  get (path: string): any {
    return objectPath.get(this.configs, path)
  }
}

export default Config