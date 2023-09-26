"use client";

import React from "react";
import Heading from "../../Heading";
import Input from "../../inputs/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface BodyContentProps {
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const BodyContent: React.FC<BodyContentProps> = ({
  isLoading,
  register,
  errors,
}) => {
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
export default BodyContent;
