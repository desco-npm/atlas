/* O módulo de mensagens */

// Recursos de terceiros
import '../lib/colors'
import cliHeader from "../lib/cliHeader" 

class Message {
  private tab = 2 // Quantos espaços de recuo a cada nível de mensagem

  // Escreve o cabeçalho
  header (): void {
    cliHeader({
      title: 'AtlasJS v' + require('../../package.json').version,
      size: 29,
      align: 'center',
    })
  }

  // Escreve uma mensagem
  put (text: string, level = 0): void {
    const tab = ''.padStart(level * this.tab, ' ')

    console.log(tab + text)
  }

  // Escreve uma mensagem de sucesso
  success (text: string, level: number): void {
    this.put(text.green, level)
  }

  // Escreve uma mensagem de erro
  error (text: string, level: number): void {
    this.put(text.red, level)
  }

  // Escreve uma mensagem de alerta
  warning (text: string, level: number): void {
    this.put(text.yellow, level)
  }

  // Escreve uma mensagem de informação
  info (text: string, level: number): void {
    this.put(text.cyan, level)
  }
}

export default new Message()