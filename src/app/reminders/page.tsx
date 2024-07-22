'use client'

import Header from "@/components/Header";
import firebase from "@/lib/firebase/firebase";
import db from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "@/UserContext";
import { getReminders } from "@/db/queries";

const Reminders = () => {

    const [reminders, setReminders] = useState<any>([]);
    
    const userCtx = useContext(UserContext);

    useEffect(() => {
        if (!userCtx.user || !userCtx.user === null) {
            return;
        }
        const fetchReminders = async (userId: string) => {
            console.log(userId);
            const reminders = await getReminders(userId);
            setReminders(reminders);
        }
        fetchReminders(userCtx.user.uid);
    }, [userCtx.user]);

    console.log(reminders);

    return (
        <div>
            <Header />
            <section>
                <h1 className="text-center text-2xl mt-2 font-bold">Your Reminders</h1>
                <div>
                    {reminders && reminders.map((reminder: any) => (
                        <div key={reminder.title} className="border border-gray-200 p-2 m-2">
                            <h2>{reminder.title}</h2>
                        </div>
                    ))} 
                </div>
            </section>
        </div>
    );
};

export default Reminders;