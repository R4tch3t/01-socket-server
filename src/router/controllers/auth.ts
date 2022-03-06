import { response, request } from "express";
import { Usuario } from "../../entities/Usuario";
import {randomUUID} from "crypto"
import bcrypt from "bcryptjs"
import {generarJWT} from "../helpers/jwt"

const crearUsuario = async (req=request, res=response)=>{
    try{
        const {email, password} = req.body
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg:"El correo ya existe"
            });    
        }
        
        const usuario: any = Usuario.create(req.body)
        const salt = bcrypt.genSaltSync();

        //gen uuid and password encrypt
        usuario.uuid=randomUUID();
        usuario.password=bcrypt.hashSync(password,salt);

        console.log(usuario)
        await usuario.save();
        
        //generar JWT
        const token = await generarJWT(usuario.id,usuario.uuid);

        res.json({
            ok:true,
            usuario,
            token
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            ok: false,
            msg:"Hable con el admin"
        });
    }
}

const login = async (req=request, res=response)=>{
    
    try{
        const {email, password} = req.body
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg:"El correo NO existe"
            });    
        }
        
        //validar password
        const validPass = bcrypt.compareSync(password,usuario.password);
        if(!validPass){
            return res.status(400).json({
                ok: false,
                msg:"El password no es correcto"
            });
        }

        //generar JWT
        const token = await generarJWT(usuario.id,usuario.uuid);

        res.json({
            ok:true,
            usuario,
            token
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            ok: false,
            msg:"Hable con el admin"
        });
    }

}

const renew = async (req=request, res=response)=>{
    const {id, uuid}:any = req;

    //generar nuevo JWT
    const token = await generarJWT(id,uuid);

    //obtenr usuario por uuid
    const usuario = await Usuario.findOne({uuid})

    res.json({
        ok: true,
        usuario,
        uuid,
        token,
        msg: 'Renew from export'
    });
}

export {crearUsuario, login, renew}
//module.exports={crearUsuario}