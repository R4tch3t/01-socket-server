import { urlApi } from "../variables/url"
export const fetchSinToken = async (endpoint:any,data:any, method="GET") => {
    const baseUrl = `${urlApi}/${endpoint}`
    
    if(method==="GET"){
        const resp = await fetch(baseUrl)
        return await resp.json()
    }else{
        const resp = await fetch(baseUrl,{
            method,
            headers:{ 
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await resp.json()
    } 
}