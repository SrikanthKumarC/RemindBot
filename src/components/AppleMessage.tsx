"use client";
import Image from "next/image";
import Imessage from "../../public/vect.svg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";

const AppleMessage = ({ children }: { children: string }) => {
    const [loading, setLoading] = useState(true);
    const [statusIndex, setStatusIndex] = useState(0);
    const STATUS_MESSAGES = ["Delivered", "Read", "Typing..."];
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading) {
            const timer = setInterval(() => {
                setStatusIndex(1)
            }, 2000);
            return () => clearInterval(timer);
        }
    }, [loading]);

    return (
        <m.div
            layout
            style={{ maxWidth: "fit-content" }}
            transition={{ ease: "linear" }}
            className=" relative mx-auto origin-left font-inter"
        >
            <div className="bg-primary origin-left text-white p-4 py-2 rounded-xl ">
                <Image
                    priority
                    alt="imessage arrow"
                    className="absolute -right-[0.7rem] bottom-0"
                    src={Imessage}
                />
                <m.div className="block text-white font-bold">
                    {loading ? (
                        <ul className="flex gap-1 items-center py-1">
                            {" "}
                            <m.li
                                initial={{ opacity: 1 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
                                className="h-4 w-4 bg-white rounded-full "
                            />
                            <m.li
                                initial={{ opacity: 1 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    repeat: Number.POSITIVE_INFINITY,
                                    duration: 0.6,
                                    delay: 0.2,
                                }}
                                className="h-4 w-4 bg-white rounded-full"
                            />
                            <m.li
                                initial={{ opacity: 1 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    repeat: Number.POSITIVE_INFINITY,
                                    duration: 0.6,
                                    delay: 0.3,
                                }}
                                className="h-4 w-4 bg-white rounded-full"
                            />{" "}
                        </ul>
                    ) : children}
                </m.div>
            </div>
            {!loading ? (
                <AnimatePresence>
                    <m.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        key={statusIndex}
                        transition={{ delay: 0.3 }}
                        className="absolute right-0 -bottom-4 text-gray-400 text-xs"
                    >
                        {STATUS_MESSAGES[statusIndex]}
                    </m.span>
                </AnimatePresence>
            ) : (
                <m.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0 }}
                    className="absolute right-0 -bottom-4 text-gray-400 text-xs"
                >
                    {STATUS_MESSAGES[2]}
                </m.span>
            )}
        </m.div>
    );
};

export default AppleMessage;
