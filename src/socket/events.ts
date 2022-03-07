import { Server } from "socket.io";
import { getUsuarios, usuarioConectado, usuarioDesconectado } from "../router/controllers/sockets";
import { comprobarJWT } from "../router/helpers/jwt";

const ioOnConnection = (io:Server) => {
    io.on('connection', async (socket) => { 
        const token:any = socket.handshake.query['x-token'];
        const [valido,ids] = comprobarJWT(token);
        if(!valido){
            console.log("Socket no identificado");
            return socket.disconnect();
        }

        //Cambiar estado de coneccion
        await usuarioConectado(ids);

        //obtener usuarios
        io.emit("getUsuarios",await getUsuarios());

        //console.log("Cliente conectado!", ids)
        //console.log(token)
        
        /*socket.on("hello", () => {
            console.log("Say event On Hello")
        });*/
        /*socket.on("msjtoserver", (data) => {
            
            const {name,msj} = data
            let time: any = new Date()
            time=time.toLocaleString();
            console.log(data)
            console.log(msj)
            io.emit("msjfromserver",{name,msj,time})
        });*/
        socket.on("disconnect",async ()=>{
            await usuarioDesconectado(ids);
            io.emit("getUsuarios",await getUsuarios());
            //socket.disconnect();
           // console.log("Cliente desconectado",ids);
        })
    });
} 

export{ioOnConnection}