import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Auth } from "../components/auth";

const Login = () => {

    return (
        <div>
            <Auth />
        </div>
    );
}
export default Login;