import { Prisma } from 'prisma-binding'

const authorizationApi = new Prisma({
    typeDefs: 'src/generated/authorizationApi.graphql',
    endpoint: 'http://localhost:4466/authorization/dev',
    debug: false
})

export { authorizationApi as default}