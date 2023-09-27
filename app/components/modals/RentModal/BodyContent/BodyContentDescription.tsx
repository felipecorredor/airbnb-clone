import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface BodyContentDescriptionProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isLoading: boolean;
}

const BodyContentDescription: React.FC<BodyContentDescriptionProps> = ({
  register,
  errors,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />
      <Input
        id="title"
        label="title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <Input
        id="description"
        label="description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

export default BodyContentDescription;
