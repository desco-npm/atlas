// Types
import { Dictionary, } from '../Dictionary/types' // Types of Dictionary

/** Dictionary of the AtlasJS Mail Module */
export default {
  en: {
    REST_ERROR_USER_ALREADY_EXISTS: 'USER ALREADY EXISTS',
    REST_ERROR_SEND_ACTIVE_USER_NOT_FOUND: 'User not found',
    REST_ERROR_SEND_ACTIVE_ALREADY_ACTIVE_USER: 'Already active user',
    REST_ERROR_ACTIVE_USER_NOT_FOUND: 'User not found or invalid code',
    REST_ERROR_ACTIVE_ACTIVE_USER_ERROR: 'An error occurred while activating the user',
    REST_ERROR_SEND_PASSWORD_RECOVER_USER_NOT_FOUND: 'User not found',
    REST_ERROR_SEND_PASSWORD_RECOVER_SAVE_ERROR: 'There was an error saving code in database',
    REST_ERROR_LOGIN_INVALID_CREDENTIALS: 'Invalid credentials',
    REST_ERROR_LOGIN_SAVE_TOKEN_ERROR: 'Error saving user token',
    REST_ERROR_LOGIN_INACTIVE_USER: 'Inactive User',
    REST_ERROR_REFRESH_PASSWORD_USER_NOT_FOUND: 'User not found',
    REST_ERROR_REFRESH_PASSWORD_INVALID_CODE: 'Invalid code',
    REST_ERROR_REFRESH_PASSWORD_SAVE_ERROR: 'Error saving new password',
    REST_ERROR_LOGOUT_USER_NOT_FOUND: 'User not found',
    REST_ERROR_LOGOUT_SAVE_ERROR: 'Error logging out',
    REST_ERROR_LOGOUT_WITHOUT_TOKEN: 'No token entered',
  },
  ptbr: {
    REST_ERROR_USER_ALREADY_EXISTS: 'Usuário já existe',
    REST_ERROR_SEND_ACTIVE_USER_NOT_FOUND: 'Usuário não encontrado',
    REST_ERROR_SEND_ACTIVE_ALREADY_ACTIVE_USER: 'Usuário já ativo',
    REST_ERROR_ACTIVE_USER_NOT_FOUND: 'Usuário não encontrado ou código inválido',
    REST_ERROR_ACTIVE_ACTIVE_USER_ERROR: 'Ocorreu um erro ao ativar o usuário',
    REST_ERROR_SEND_PASSWORD_RECOVER_USER_NOT_FOUND: 'Usuário não encontrado',
    REST_ERROR_SEND_PASSWORD_RECOVER_SAVE_ERROR: 'Ocorreu um erro ao salvar o código em banco',
    REST_ERROR_LOGIN_INVALID_CREDENTIALS: 'Credenciais inválidas',
    REST_ERROR_LOGIN_SAVE_TOKEN_ERROR: 'Erro ao salvar o token do usuário',
    REST_ERROR_LOGIN_INACTIVE_USER: 'Usuário inativo',
    REST_ERROR_REFRESH_PASSWORD_INVALID_CODE: 'Código inválido',
    REST_ERROR_REFRESH_PASSWORD_SAVE_ERROR: 'Erro ao salvar a nova senha',
    REST_ERROR_LOGOUT_USER_NOT_FOUND: 'Usuário não encontrado',
    REST_ERROR_LOGOUT_SAVE_ERROR: 'Erro ao deslogar',
    REST_ERROR_LOGOUT_WITHOUT_TOKEN: 'Não foi informado um token',
  },
} as Dictionary