"use client";
import { useState } from "react";
import Link from "next/link";

import {
  Alert,
  Button,
  Divider,
  Group,
  Input,
  PasswordInput,
} from "@mantine/core";

import firebaseApp from "@/lib/firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { IconInfoCircle, IconBrandGoogleFilled } from "@tabler/icons-react";

const Form = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  const auth = getAuth(firebaseApp);
  console.log(formState);

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
  };

  const handleRegistration = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      console.log(userCredential);
      console.log(userCredential.user);
      alert("User login successfully");
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const icon = <IconInfoCircle />;
  return (
    <div className=" p-4">
      <Alert variant="light" color="blue" icon={icon}>
        Your reminder is saved! View after logging in.
      </Alert>
      <form>
        <Input.Wrapper
          label="Email"
          description="You will receive reminders on this email"
          error=""
          className="mb-2 mt-2"
        >
          <Input
            placeholder="me@awesome.com"
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
          />
        </Input.Wrapper>
        <PasswordInput
          label="Password"
          description="Choose a strong password"
          placeholder="********"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />  
        <PasswordInput
          label="Confirm Password"
          placeholder="********"
          value={formState.confirmPassword}
          onChange={(e) =>
            setFormState({ ...formState, confirmPassword: e.target.value })
          }
        />
        <div className="max-w-fit mx-auto mt-2">
          <Button
            onClick={handleRegistration}
            variant="filled"
            className="text-center"
          >
            Create account
          </Button>
        </div>
        <Link href={"/login"}>
          {" "}
          <p className="text-center text-xs mt-2 text-blue-500 underline">
            Already have an account
          </p>
        </Link>
      </form>
      <Divider my="xs" label="or" labelPosition="center" />

      <Group justify="center" className="mt-4">
        <Button
          onClick={handleGoogleLogin}
          leftSection={<IconBrandGoogleFilled />}
          variant="outline"
        >
          Sign in with Google
        </Button>
      </Group>
    </div>
  );
};

export default Form;
