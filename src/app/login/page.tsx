"use client";
import { useState } from "react";
import Header from "@/components/Header";
import firebaseApp from "@/lib/firebase/firebase";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import RegisterForm from "@/components/RegisterForm";
import {  onAuthStateChanged } from "firebase/auth";


const Login = () => {
    const [formState, setFormState] = useState({ email: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    console.log(formState);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in");
        } else {
            console.log("User is signed out");
        }
    })

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithPopup(auth, provider);
            console.log(userCredential);
        } catch (error: any) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async (e: any) => {
        setLoading(true);
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formState.email, formState.password);
            console.log(userCredential);
            console.log(userCredential.user);
            alert("User logined successfully");
        } catch (error: any) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handlePasswordReset = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, formState.email);
            alert("Password reset email sent");
        } catch (error: any) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Header />
            <section>
                {error && <p className="text-center">{error}</p>}
                <form className="flex flex-col items-center gap-2" action="">
                    <input
                        className="border-2 p-2 rounded-lg"
                        type="text"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Email"
                    />
                    <input
                        value={formState.password}
                        onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                        className="border-2 p-2 rounded-lg"
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleLogin}
                        className={`bg-blue-500 ${loading && 'bg-gray-500'} text-white p-2 rounded-lg`}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleGoogleLogin}
                        className={`bg-blue-500 ${loading && 'bg-gray-500'} text-white p-2 rounded-lg`}
                    >
                        {loading ? "Loading..." : "Google Login"}
                    </button>
                    <button onClick={handlePasswordReset}>Forgot Password</button>
                </form>
            </section>
        </div>
    );
};
export default Login;
