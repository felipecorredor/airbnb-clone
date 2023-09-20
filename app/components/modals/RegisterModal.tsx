"use client";

import React, { useState } from "react";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import axios from "axios";
import { toast } from "react-hot-toast";

import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
};

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("api/register", data)
      .then(() => {
        toast.success("Registered");
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={
        <BodyContent
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      }
      footer={<FooterContent />}
    />
  );
};

interface BodyContentProps {
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const BodyContent = ({ isLoading, register, errors }: BodyContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

const FooterContent = () => {
  const registerModal = useRegisterModal();
  return (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className=" text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={() => registerModal.onClose()}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
