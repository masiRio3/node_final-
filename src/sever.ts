import express from 'express';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { BookResolver } from './resolvers/book.resolver';
import { AuthorResolver } from './resolvers/author.resolver';
import { AuthResolver } from './resolvers/auth.resolver';

import {authChecker} from "../src/user/authChecker"




export async function startServer() {
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({ resolvers: [BookResolver, AuthorResolver, AuthResolver],
        authChecker:authChecker
        }),
        

        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, path: '/graphql' })

    return app;
};