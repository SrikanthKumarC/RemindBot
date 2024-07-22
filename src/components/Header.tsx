"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@mantine/core";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { User } from "firebase/auth";
import app from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";

const Header = ({ dashboard = false }) => {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...═
        setUser(user);
      } else {
        // User is signed out
        // ...
        // router.push("/login");
      }
    });
  }, []);


  return (
    <div className="relative">
      <nav className=" w-full relative flex justify-between pt-6 lg:px-12 px-4 lg:pt-4 items-center border-gray-200">
        <Link href={"/"}>
          <h1 className="font-sora font-bold text-3xl text-primary">
            RemindBot
          </h1>
        </Link>
        <div className="flex items-center">
          {user && <Link className="pr-4" href={"/reminders"}>Your Reminders</Link>}
          {user && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Image
                  src={user?.photoURL || ""}
                  alt="Profile picture"
                  height="40"
                  width="40"
                  className="shadow cursor-pointer border-white border-2 rounded-full"
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() =>
                    signOut(auth)
                      .then(() => {
                        // router.push("/login");
                      })
                      .catch((err) => {
                        console.error(err);
                      })
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
          {!user && (
            <Link href="/login" className="text-primary">
              Login
            </Link>
          )}
        </div>
        
      </nav>
    </div>
  );
};

export default Header;
