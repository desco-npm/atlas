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
  put (text: string): void {
    console.log(text)
  }

  // Escreve uma mensagem de sucesso
  success (text: string): void {
    this.put(text.green)
  }

  // Escreve uma mensagem de erro
  error (text: string): void {
    this.put(text.red)
  }

  // Escreve uma mensagem de alerta
  warning (text: string): void {
    this.put(text.yellow)
  }

  // Escreve uma mensagem de informação
  info (text: string): void {
    this.put(text.cyan)
  }
}

export default new Message()