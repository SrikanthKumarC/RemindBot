"use client";

import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import firebase from "@/lib/firebase/firebase";

export const UserContext = createContext<{ user: User | null }>({ user: null });

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth(firebase);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;