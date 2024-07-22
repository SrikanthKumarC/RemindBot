"use client";
import { useState } from "react";
import Header from "@/components/Header";
import firebaseApp from "@/lib/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [formState, setFormState] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const auth = getAuth(firebaseApp); 
  console.log(formState);

  const handleRegistration = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formState.email, formState.password);
      console.log(userCredential);
      console.log(userCredential.user);
      alert("User login successfully");
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
          <input
            value={formState.confirmPassword}
            onChange={(e) => setFormState({ ...formState, confirmPassword: e.target.value })}
            className="border-2 p-2 rounded-lg"
            type="password"
            placeholder="Confirm Password"
          />
          <button
            type="button"
            disabled={loading}
            onClick={handleRegistration}
            className={`bg-blue-500 ${loading && 'bg-gray-500'} text-white p-2 rounded-lg`}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </section>
    </div>
  );
};
export default Register;
