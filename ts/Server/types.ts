/* Tipos do servidor */

import { OptionsUrlencoded, OptionsJson } from 'body-parser' 

export interface IServerConfig { 
  port: number, // Porta onde rodar o servidor
  callback?: () => void, // Função a ser executada quando iniciar o servidor
  queryString?: OptionsUrlencoded // Opções do encoded de url da requisição
  body?: OptionsJson // Opções do encodes de dados do corpo da requisição
};