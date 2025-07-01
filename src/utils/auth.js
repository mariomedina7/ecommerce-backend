import bcrypt from 'bcrypt'
import { SECURITY_CONFIG } from '../config/config.js'

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SECURITY_CONFIG.BCRYPT_ROUNDS))
}

export const isValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
}