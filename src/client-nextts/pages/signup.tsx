import type {NextPage} from 'next'
import { useCallback, useState } from 'react';
import {useCreateUserMutation, UsuarioInput, CreateUserDocument } from './graphql/generated';
import {Client} from 'urql'
import UsuariosQ from './UsuariosQ';



const Signup: NextPage = () => {
    const [form, setForm] = useState({
        nombre:'nombre',
        email:'test@test.com',
        password: '1234'
    });
    
    const crear = useCallback( ()=>{
        const [user,  createUser ] = useCreateUserMutation()
    
    const newUser: UsuarioInput = {nombre: form.nombre, email:form.email, password: form.password, online: false}
    createUser( { user: newUser } );
    }, []);
    

    const onChange = ({target}:any) => {
        const {name, value} = target;
        setForm({
          ...form,
          [name]: value
        });
    }

    const onSubmit = (e:any) => {
        e.preventDefault();
        //crear()
        
        const url = "http://localhost:3000/graphql";
        const user: UsuarioInput = {nombre: form.nombre, email:form.email, password: form.password, online: false}
        const usuariosResult:any = (new Client({ url })).mutation(CreateUserDocument,{user}).toPromise()
        usuariosResult.then((v:any)=>{
            console.log("toPromise")
            console.log("Usuario Creado")
            console.log(v)
        })
        //addTodo.stale()({ variables: { type: input.value } });
        console.log(form)
      }

    return (
    <>
    
        {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
        */}
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/*<UsuariosQ />*/}
            <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrar una cuenta</h2>
            {/*<p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
            </a>
            </p>*/}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit} method="POST">
                <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre
                </label>
                <div className="mt-1">
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={form.nombre}
                        onChange={onChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                </div>

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                </label>
                <div className="mt-1">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                </div>

                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={onChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                </div>

                <div className="flex items-center justify-between">

                    <div className="text-sm">
                        <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        ¿Ya tienes cuenta?
                        </a>
                    </div>
                    </div>

                <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Registrar
                </button>
                </div>
            </form>

            
            </div>
        </div>
        </div>
    </>
    )

}

export default Signup