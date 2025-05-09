import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = auth.currentUser; // Check if the user is authenticated

    if (!user) {
        // If not authenticated, redirect to login
        return <Navigate to="/" />;
    }

    // If authenticated, render the children (e.g., Home component)
    return children;
}; 