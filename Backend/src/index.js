import { GraphQLServer, PubSub } from'graphql-yoga'
import resolvers from './resolvers'
import chalk from 'chalk'
import dotenv from 'dotenv'
import authorizationApi from './authorizationApi'

dotenv.config({ path:'development.env'})
const pubsub = new PubSub()
import { Prisma } from 'prisma-binding'

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
    // context: req => ({ ...req, authorizationApi, trackTraceApi })
    context: req => ({ ...req, pubsub, authorizationApi }),
});

server.start({
    cors: {
        credentials: true,
        origin: process.env.SERVER_URL,
    },
},() => console.log(`GraphQL Yoga is runnning on ${chalk.green(process.env.SERVER_URL)}`),
);
