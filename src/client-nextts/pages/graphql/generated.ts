import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Archivo = {
  __typename?: 'Archivo';
  createdAt: Scalars['String'];
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['Float'];
  mimetype: Scalars['String'];
};

export type FileInput = {
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type FileUpdateInput = {
  encoding?: InputMaybe<Scalars['String']>;
  filename?: InputMaybe<Scalars['String']>;
  mimeType?: InputMaybe<Scalars['String']>;
};

export type Mensaje = {
  __typename?: 'Mensaje';
  de?: Maybe<Usuario>;
  id: Scalars['Float'];
  mensaje: Scalars['String'];
  para?: Maybe<Usuario>;
  paras?: Maybe<Array<Usuario>>;
  time: Scalars['String'];
};

export type MensajeInput = {
  mensaje: Scalars['String'];
};

export type MensajeUpdateInput = {
  mensaje?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFile: Archivo;
  createMensaje: Mensaje;
  createUser: Usuario;
  deleteFile: Scalars['Boolean'];
  deleteMensaje: Scalars['Boolean'];
  deleteUsuario: Scalars['Boolean'];
  multiUpload: Array<Archivo>;
  singleUpload: Archivo;
  updateFile: Scalars['Boolean'];
  updateMensaje: Scalars['Boolean'];
  updateUsuario: Scalars['Boolean'];
};


export type MutationCreateFileArgs = {
  variables: FileInput;
};


export type MutationCreateMensajeArgs = {
  de: De_User;
  msjInput: MensajeInput;
  para: Para_User;
};


export type MutationCreateUserArgs = {
  user: UsuarioInput;
};


export type MutationDeleteFileArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMensajeArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUsuarioArgs = {
  id: Scalars['Int'];
};


export type MutationMultiUploadArgs = {
  files: Array<Scalars['Upload']>;
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationUpdateFileArgs = {
  fields: FileUpdateInput;
  id: Scalars['Int'];
};


export type MutationUpdateMensajeArgs = {
  fields: MensajeUpdateInput;
  id: Scalars['Int'];
};


export type MutationUpdateUsuarioArgs = {
  fields: UsuarioUpdateInput;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  archivos: Array<Archivo>;
  mensajes: Array<Mensaje>;
  usuarios: Array<Usuario>;
};


export type QueryMensajesArgs = {
  deId: Scalars['Int'];
  deUuid: Scalars['String'];
  paraId: Scalars['Int'];
  paraUuid: Scalars['String'];
};

export type Usuario = {
  __typename?: 'Usuario';
  email: Scalars['String'];
  id: Scalars['Float'];
  msj_de?: Maybe<Array<Mensaje>>;
  msj_para?: Maybe<Array<Mensaje>>;
  msj_paras?: Maybe<Array<Mensaje>>;
  nombre: Scalars['String'];
  online: Scalars['Boolean'];
  password: Scalars['String'];
  uuid: Scalars['String'];
};

export type UsuarioInput = {
  email: Scalars['String'];
  nombre: Scalars['String'];
  online: Scalars['Boolean'];
  password: Scalars['String'];
  uuid?: InputMaybe<Scalars['String']>;
};

export type UsuarioUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  nombre?: InputMaybe<Scalars['String']>;
  online?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
};

export type De_User = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  nombre?: InputMaybe<Scalars['String']>;
};

export type Para_User = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  nombre?: InputMaybe<Scalars['String']>;
};

export type MensajesQueryVariables = Exact<{
  paraUuid: Scalars['String'];
  paraId: Scalars['Int'];
  deUuid: Scalars['String'];
  deId: Scalars['Int'];
}>;


export type MensajesQuery = { __typename?: 'Query', mensajes: Array<{ __typename?: 'Mensaje', id: number, mensaje: string, time: string, de?: { __typename?: 'Usuario', id: number, uuid: string, email: string } | null, para?: { __typename?: 'Usuario', id: number, uuid: string, email: string } | null }> };

export type UsuariosQueryVariables = Exact<{ [key: string]: never; }>;


export type UsuariosQuery = { __typename?: 'Query', usuarios: Array<{ __typename?: 'Usuario', id: number, email: string }> };

export type CreateUserMutationVariables = Exact<{
  user: UsuarioInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Usuario', id: number, nombre: string, email: string } };


export const MensajesDocument = gql`
    query Mensajes($paraUuid: String!, $paraId: Int!, $deUuid: String!, $deId: Int!) {
  mensajes(paraUuid: $paraUuid, paraId: $paraId, deUuid: $deUuid, deId: $deId) {
    id
    mensaje
    time
    de {
      id
      uuid
      email
    }
    para {
      id
      uuid
      email
    }
  }
}
    `;

export function useMensajesQuery(options: Omit<Urql.UseQueryArgs<MensajesQueryVariables>, 'query'>) {
  return Urql.useQuery<MensajesQuery>({ query: MensajesDocument, ...options });
};
export const UsuariosDocument = gql`
    query Usuarios {
  usuarios {
    id
    email
  }
}
    `;

export function useUsuariosQuery(options?: Omit<Urql.UseQueryArgs<UsuariosQueryVariables>, 'query'>) {
  return Urql.useQuery<UsuariosQuery>({ query: UsuariosDocument, ...options });
};
export const CreateUserDocument = gql`
    mutation createUser($user: UsuarioInput!) {
  createUser(user: $user) {
    id
    nombre
    email
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};