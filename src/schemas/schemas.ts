
import { buildSchema } from 'type-graphql';

import { FileResolver } from '../resolvers/FileResolver';

export default async () => await buildSchema({
    resolvers: [ FileResolver ],
    validate: false

})