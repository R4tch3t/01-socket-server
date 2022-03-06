import type {NextPage} from 'next'
import { XCircleIcon } from '@heroicons/react/solid'
const Errors = ({e}:any) => {
    //const {e}=props
    console.log("e"+e)
    const title = e.length<2?"Se encontro el siguiente error en la consulta:":
    (`Se encontraron ${e.length} errores en la consulta`)
    /*<div className="rounded-md bg-red-50 p-4" style={{position: 'fixed', width: '100%'}} >*/
    return (
    <div className="rounded-md bg-red-50 p-4"  >
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800"> {title}  </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc pl-5 space-y-1">
                    {e&&e.map((v:any,i:any)=>{
                        return <li key={i} > {v} </li> 
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Errors