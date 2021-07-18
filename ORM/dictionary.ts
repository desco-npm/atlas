// Necessary parts
import { Dictionary, } from '../Message/types' // Types of Dictionary

/** Dictionary of the AtlasJS ORM Module */
export default {
  en: {
    InvalidConnectionTitle: 'Could not connect to database',
    InvalidConnectionMessage: 'Please check your connection data and try again',
    InvalidConnectionNameTitle: 'Unknown Database',
    InvalidConnectionNameMessage: 'The name entered for the database connection is not matches an '
      + 'existing connection',
  },
  ptbr: {
    InvalidConnectionTitle: 'Não foi possível conectar ao banco de dados',
    InvalidConnectionMessage: 'Verifique os dados de conexão e tente novamente',
    InvalidConnectionNameTitle: 'Banco de dados desconhecido',
    InvalidConnectionNameMessage: 'O nome informado para a conexão ao banco de dados não '
      + 'corresponde a uma conexão existente',
  }
} as Dictionary