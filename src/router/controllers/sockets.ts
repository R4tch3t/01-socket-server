import { Usuario } from "../../entities/Usuario";

const usuarioConectado = async ({id,uuid}:any)=>{
    const usuario:any = await Usuario.findOne(id);
    usuario.online=true;
    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async ({id,uuid}:any)=>{
    const usuario:any = await Usuario.findOne(id);
    usuario.online=false;
    await usuario.save();

    return usuario;
}

const getUsuarios = async ()=>{
    const usuarios:any = await Usuario.find({order: {
        online: "DESC",
    }});
    
    return usuarios;
}

export{
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios
}