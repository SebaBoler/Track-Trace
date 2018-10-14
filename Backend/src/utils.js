import { verify } from 'jsonwebtoken'

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthError()
}

class AuthError extends Error {
  constructor() {
    super('Srry hacker, you are not invited here')
  }
}

module.exports = {
  getUserId,
  AuthError
}