import "./Auth.css";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("user", "logged");
            window.location.href = "/home"; // Redirect to login page if not logged in
            console.log("User signed in successfully!");

        } catch (error) {
            console.error("Error signing in:", error);
            alert("Error signing in. Please check your credentials.");
        }
    };

    const signOut = async () => {
        await auth.signOut();
        localStorage.removeItem("user");
        console.log("User signed out successfully!");
    };

    return (
        <div className="auth-container">
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your email.."
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter your password.."
            />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signOut}>Sign Out</button>
            <div className="notification" id="notification">
                Annotation submitted successfully!
            </div>
        </div>
    );
};