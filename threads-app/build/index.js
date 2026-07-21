import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8005;
    app.use(express.json());
    //Create Graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
    `,
        resolvers: {
            Query: {
                hello: () => `Hey there, I am a Graphql server`,
                say: (_, { name }) => `hey ${name}, how are you?`
            },
        },
    });
    //start the gqlServer
    await gqlServer.start();
    app.get("/", (req, res) => {
        res.json({ message: "server is up and running" });
    });
    app.use('/graphql', expressMiddleware(gqlServer));
    app.listen(PORT, () => console.log(`server started on PORT:${PORT}`));
}
init();
//# sourceMappingURL=index.js.map