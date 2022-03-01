import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import fs from 'fs';
import https from 'https';
import http from 'http';
import {graphqlUploadExpress} from 'graphql-upload';
import path from 'path';
import schemas from './schemas/schemas'
import {Server} from 'socket.io';

export async function startServer(){
    const app = express();
    
    const schema = await schemas();
    const configurations: {[index: string]:any} = {
      production: { ssl: true, port: 443, hostname: 'localhost' },
      development: { ssl: false, port: 8080, hostname: 'localhost' },
    }; 
    const environment = process.env.NODE_ENV || 'development';
    const config = configurations[environment];

    const server = new ApolloServer({
        schema,
        context: ({req, res}) => ({req, res})
    });
    await server.start()
    app.use(graphqlUploadExpress());
    server.applyMiddleware({app, path: '/graphql'});

    app.use(express.static(path.join(__dirname, 'client-nextts/.next')));

    //app.use("/",express.static(path.join(__dirname, 'client-nextts/.next')));
    app.use("/_next",express.static(path.join(__dirname, 'client-nextts/.next')));
    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'client-nextts/.next/server/pages', 'index.html'));
    });

    let httpServer: any;
    if (config.ssl) {
      httpServer = https.createServer(
        {
          key: fs.readFileSync(path.join(__dirname,`ssl/${environment}/server.key`)),
          cert: fs.readFileSync(path.join(__dirname,`ssl/${environment}/server.crt`))
        },

        app,
      );
    } else {
      httpServer = http.createServer(app);
    }

    const io = new Server(httpServer)
    
    io.on('connection', (socket) => { 
      console.log("Cliente conectado!")
      /*socket.on("hello", () => {
        console.log("Say event On Hello")
      });*/
      socket.on("msjtoserver", (data) => {
        
        const {name,msj} = data
        let time: any = new Date()
        time=time.toLocaleString();
        console.log(data)
        console.log(msj)
        io.emit("msjfromserver",{name,msj,time})
      });
    });

    await new Promise<void>(resolve =>
      httpServer.listen({ port: config.port }, resolve)
    );
    
    console.log(
      '🚀 Server ready at',
      `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
        server.graphqlPath
      }`
    );
}