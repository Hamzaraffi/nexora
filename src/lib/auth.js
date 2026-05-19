import crypto from 'crypto'

export function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
}

export function generateSalt() {
  return crypto.randomBytes(16).toString('hex')
}

export function verifyPassword(password, hashedPassword, salt) {
  return hashPassword(password, salt) === hashedPassword
}
