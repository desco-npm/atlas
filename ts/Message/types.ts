/* Tipos do módulo de mensagens */

// Mensagens nos idiomas
export interface IDictionary {
  ptbr: {},
  en: {},
}

// Idiomas suportados pelo framework
export enum EMessageLangs  {
  ptbr = 'ptbr',
  en = 'en',
}

export interface IMessageConfig { 
  lang?: EMessageLangs, // Idioma em uso
  tab?: number, // Quantos espaços de recuo a cada nível de mensagem
};

// Cores por tipo de mensagem
export enum EMessageColorType  {
  success = 'green',
  error = 'red',
  warning = 'yellow',
  cyan = 'info',
}

// Opções do método put
export interface EMessagePutOptions  {
  level?: number,
  type?: EMessageColorType,
  bind?: {}
}