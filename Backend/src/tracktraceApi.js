import { Prisma } from 'prisma-binding'

const trackTraceApi = new Prisma ({
    typeDefs: './generated/tracktrace-api.graphql',
    endpoint: 'http://localhost:4466/tracktrace/dev',
    // secret: '',
    debug: false,
});

export { trackTraceApi as default };