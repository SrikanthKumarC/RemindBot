"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "@/UserContext";
import { getReminders, deleteReminder } from "@/db/queries";
import { format } from "date-fns";

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
    };
    fetchReminders(userCtx.user.uid);
  }, [userCtx.user]);

  console.log(reminders);

  return (
    <div>
      <Header />
      <section>
        <h1 className="text-center  text-2xl mt-2 font-bold">Your Reminders</h1>
        <div className="rounded-lg">
          {reminders &&
            reminders.map((reminder: any) => (
              <div
                key={reminder.id}
                className="border flex-row-reverse flex justify-between items-center border-gray-200 p-2 m-2"
              >
                <div>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-500 px-2 py-2"
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <h2 className="text-xl font-bold capitalize">
                    {reminder.title}
                  </h2>
                  <p>{format(reminder.time, "do LLL yyyy 'at' hh:mm aa")}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Reminders;
