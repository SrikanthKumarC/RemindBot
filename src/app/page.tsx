"use client";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";

import AppleMessage from "@/components/AppleMessage";
import RegisterForm from "@/components/RegisterForm";
import Header from "@/components/Header";
// import { IoMdCalendar } from "react-icons/io";
import { IconCalendarEvent } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import { Button, Modal } from "@mantine/core";
// import db from "@/lib/firebase/firestore";
import { useDisclosure } from "@mantine/hooks";
import { createReminder } from "@/db/queries";
import { v4 as uuidv4 } from "uuid";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import firebase from "@/lib/firebase/firebase";

export default function Home() {
  const [value, setValue] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const auth = getAuth(firebase);

  const [user, setUser] = useState<User>();

  const [message, setMessage] = useState<string>();

  const [localMessage, setLocalMessage] = useLocalStorage({
    key: "remindbot-current-message",
    defaultValue: { message: message, date: value?.toISOString() },
  });

  useEffect(() => {
    if (localMessage.date && localMessage.message) {
      setMessage(localMessage.message);
      setValue(new Date(localMessage.date || ""));
    }
  }, [localMessage]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        setUser(user);
      }
    });
  }, [auth]);

  const saveReminder = async (e: any) => {
    if (!value || !message) {
      alert("Please enter a message and a date");
      return;
    }
    setLoading(true);
    e.preventDefault();
    if (!user) {
      alert("Please login to save reminders");
      setLocalMessage({ message, date: value?.toISOString() });
      return;
    }
    await createReminder({
      id: uuidv4(),
      createdBy: user.uid,
      title: message,
      time: value.toISOString(),
    });

    // const docRef = await addDoc(collection(db, "reminders"), {
    //   message: message,
    //   date: value,
    //   createdBy: user.uid,
    // });
    // console.log("Document written with ID: ", docRef.id);
    alert("Reminder saved!");
    setLoading(false);
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
        {/* <h1 className="text-xl text-center text-gray-500 capitalize mb-2"></h1> */}
        <div className="flex flex-col sm:flex-row gap-1">
          <input
            className="dark:placeholder:text-gray-900 border-gray-300 border rounded-full sm:rounded-r-lg  p-[0.67rem] px-4 "
            type="text"
            value={message}
            onChange={(e) => {
              setLocalMessage({ ...localMessage, message: e.target.value });
              setMessage(e.target.value);
            }}
            placeholder="Your message"
          />

          <div className="dark:bg-white border-gray-300 items-center rounded-full  sm:rounded-l-lg p-1 sm:p-2 flex border   px-4 ">
            <IconCalendarEvent className="text-black sm:text-sm text-sm" />
            <DatePickerInput
              clearable
              dropdownType="modal"
              className="max-w-sm text-sm w-full "
              placeholder="When?"
              minDate={new Date()}
              value={value}
              onChange={(date) => {
                setLocalMessage({ ...localMessage, date: date?.toISOString() });
                setValue(date);
              }}
            />
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
            } bg-secondary py-2 px-4 text-primary border-2 rounded-full`}
          >
            {loading ? "Loading..." : "Create reminder"}
          </button>
        </div>
      </form>
      {/* <div></div> */}

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
