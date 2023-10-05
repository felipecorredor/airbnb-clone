"use client";

import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "../Modal";

import BodyContent from "./BodyContent";
import FooterContent from "./FooterContent";
import useLoginModal from "@/app/hooks/useLoginModal";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
};

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
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
        loginModal.onOpen();
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

export default RegisterModal;
