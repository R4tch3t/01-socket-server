import Link from 'next/link'
import React from 'react';

import Chat from "../subPages/Chat"
//import Login from "../login"
//import Registro from "../sigin"
 const AppLinker = () =>{
return (<>
    <header >
        <Link href="/" > </Link>
        <Link href="/login" > </Link>
        <Link href="/signup" > </Link>
        {/*<ul>
            <li>
            <Link href="/">
                <a>Home</a>
            </Link>
            </li>
            <li>
            <Link href="/login">
                <a>login</a>
            </Link>
            </li>
            <li>
            <Link href="/sigin">
                <a>sigin</a>
            </Link>
            </li>
            <li>
            <Link href="/post/second">
                <a>Second Post</a>
            </Link>
            </li>
        </ul>*/}
    </header>
    <Chat/>
    </>
);
}
export default AppLinker