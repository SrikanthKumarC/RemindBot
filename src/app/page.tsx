"use client";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";

import AppleMessage from "@/components/AppleMessage";
import RegisterForm from "@/components/RegisterForm";
import Header from "@/components/Header";

import { IconCalendarEvent } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import { Button, Modal } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { createReminder } from "@/db/queries";
import { v4 as uuidv4 } from "uuid";

import { HOURS, MINUTES, combineDateAndTime } from "@/utils";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import firebase from "@/lib/firebase/firebase";

import {
  dehydrate,
  HydrationBoundary,
  useQueryClient,
  useQuery,
  useMutation,
} from "@tanstack/react-query";

export default function Home() {
  const [value, setValue] = useState<Date | null>(null);
  const [time, setTime] = useState<{
    hours: string;
    minutes: string;
    amorpm: string;
  }>({ hours: "1", minutes: "0", amorpm: "am" });
  const [opened, { open, close }] = useDisclosure(false);
  const auth = getAuth(firebase);

  const queryClient = useQueryClient();

  const [user, setUser] = useState<User>();

  const [message, setMessage] = useState<string>();

  const [localMessage, setLocalMessage] = useLocalStorage({
    key: "remindbot-current-message",
    defaultValue: {
      message: message,
      date: value?.toISOString() || "",
      time: time || "12:00",
    },
  });

  console.log(user?.uid, " user id");
  const combinedDate = new Date(
    `${value?.toISOString().split("T")[0]}T${time.hours}:${
      time.minutes
    }:00${time.amorpm === "pm" ? "pm" : "am"}`
  );

  console.log(combinedDate, "combined date", time, "time", value, "value");
  const mutation = useMutation({
    mutationFn: () =>
      createReminder({
        id: uuidv4(),
        email: user!.email || "",
        createdBy: user!.uid,
        title: message!,
        time: combineDateAndTime(time, value!).toISOString(),
      }),
    onSuccess: () => {
      setMessage("");
      setValue(null);
      setTime({ hours: "", minutes: "", amorpm: "" });
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });

  console.log(time, "time");

  const loading = mutation.isPending;


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        close();
      }
    });
  }, [auth, close]);

  const saveReminder = async (e: any) => {
    e.preventDefault();
    if (!value || !message || !time) {
      alert("Please enter a message and a date and time");
      return;
    }
    if (!user) {
      open();
      setLocalMessage({
        message,
        date: value?.toISOString(),
        time: time || "12:00",
      });
      return;
    }
    mutation.mutate();
    alert("Reminder saved!");
  };

  return (
    <main className="">
      <Header dashboard={true} />
      <div className="text-center mt-24 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl mb-8 font-bold">
          Your reminder app in the cloud!
        </h1>
        <AppleMessage>Get notified via SMS, Email or a Webhook</AppleMessage>
      </div>
      <form className="mx-auto max-w-fit mt-6 flex flex-col gap-2 p-2 ">
        <div className="flex flex-col sm:flex-row gap-1">
          <input
            className="dark:placeholder:text-gray-900 placeholder:text-gray-200 border-gray-300 border rounded-full sm:rounded-r-lg  p-[0.67rem] px-4 "
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Your message"
          />

          <div className="dark:bg-white border-gray-300 items-center rounded-full  sm:rounded-l-lg p-1 sm:p-2 flex border   px-4 ">
            <IconCalendarEvent className="text-black sm:text-sm text-sm" />
            <DatePickerInput
              required
              clearable
              dropdownType="modal"
              className="max-w-sm text-sm w-full "
              placeholder="When?"
              minDate={new Date()}
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="flex flex-col">
    
          <div className="flex justify-center p-2 gap-2">
            <label htmlFor="">Hours</label>
            <select
              name="hours"
              id="hours"
              onChange={(e) => {
                setTime({ ...time, hours: e.target.value });
              }}
              value={time.hours}
              className="max-w-fit border rounded-lg"
            >
              {HOURS.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <label htmlFor="">Minutes</label>

            <select
              name="minutes"
              id="minutes"
              onChange={(e) => {
                setTime({ ...time, minutes: e.target.value });
              }}
              value={time.minutes}
              className="max-w-fit border rounded-lg"
            >
              {MINUTES.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <select
              name="amorpm"
              id="amorpm"
              onChange={(e) => {
                setTime({ ...time, amorpm: e.target.value });
              }}
              className="max-w-fit border rounded-lg"
            >
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
        <div
          className=" mx-auto mt-4"
          onClick={() => {
            if (!message || !value) {
              return;
            }
            if (user) {
              return;
            }
            open();
          }}
        >
          <button
            disabled={loading}
            onClick={saveReminder}
            className={` w-full border-primary bg-primary text-white font-bold hover:text-primary hover:bg-white ${
              loading && "bg-gray-500"
            }  py-2 px-4 text-primary border-2 rounded-full`}
          >
            {loading ? "Loading..." : "Create reminder"}
          </button>
        </div>
      </form>

      <Modal
        opened={opened}
        onClose={close}
        size={"xl"}
        title="Create an account"
        className="dark:bg-gray-700 dark:text-black "
      >
        <RegisterForm />
      </Modal>
    </main>
  );
}
