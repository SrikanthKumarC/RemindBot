"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "@/UserContext";
import { getReminders, deleteReminder } from "@/db/queries";
import { format } from "date-fns";

import {
  dehydrate,
  HydrationBoundary,
  useQueryClient,
  useQuery,
  useMutation,
} from "@tanstack/react-query";




const Reminders = () => {
  const [reminders, setReminders] = useState<any>([]);

  const queryClient = useQueryClient();

  const userCtx = useContext(UserContext);

  // useEffect(() => {
  //   if (!userCtx.user || !userCtx.user === null) {
  //     return;
  //   }
  //   const fetchReminders = async (userId: string) => {
  //       console.log(userId, "userid"); 
  //     const reminders = await getReminders(userId);
  //     setReminders(reminders);
  //   };
  //   fetchReminders(userCtx.user.uid);
  // }, [userCtx.user]);

  //   console.log(reminders);

  const { data, isLoading } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(userCtx.user?.uid || ""),
    enabled: !!userCtx.user,
  });

  const mutation = useMutation({
    mutationFn: (reminderId: string) => deleteReminder(reminderId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });

  console.log(data);

  if (isLoading) {
    return (
      <div>
        <Header />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <section>
        <h1 className="text-center  text-2xl mt-2 font-bold">Your Reminders</h1>
        <div className="rounded-lg">
          {data &&
            data.map((reminder: any) => (
              <div
                key={reminder.id}
                className="border flex-row-reverse flex justify-between items-center border-gray-200 p-2 m-2"
              >
                <div>
                  <button
                    onClick={() => mutation.mutate(reminder.id)}
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
