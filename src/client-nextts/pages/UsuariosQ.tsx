import React, {useState} from 'react';
import { UsuariosDocument } from "./graphql/generated";
import {Provider, Client, Query, gql, QueryState, } from 'urql'

const UsuariosQ=()=>{
    console.log('???')
    console.log(process.env.URL_DEV)
    /*const UsuariosDocument:any = gql`
    query Usuarios {
  usuarios {
    id
    email
  }
}
    `;*/
    const [s,sSet] = useState('')
    //const [usuariosResult] = useUsuariosQuery(); new Client({ url }).
    const url = "http://localhost:3000/graphql";
    const usuariosResult:any = (new Client({ url })).query(UsuariosDocument).toPromise()
    usuariosResult.then((v:any)=>{
      console.log("toPromise")
      console.log(v)
    })
    //const users:any = usuariosResult&&usuariosResult.data ? usuariosResult.data : []
    //console.log(usuariosResult)
    return (
        <>
          
            {/*users && <h2>  {users.map((v:any,i:any)=>{return <p><b>{`N°: ${i+1} - ID: ${v}`}</b></p> })}  </h2>*/}
    
        </>
    );
}



export default UsuariosQ