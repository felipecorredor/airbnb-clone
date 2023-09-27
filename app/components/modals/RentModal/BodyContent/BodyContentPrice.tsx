import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import React from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface BodyContentPriceProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isLoading: boolean;
}

const BodyContentPrice: React.FC<BodyContentPriceProps> = ({
  register,
  errors,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your price"
        subtitle="How much do you charge per night?"
      />
      <Input
        id="price"
        label="price"
        disabled={isLoading}
        register={register}
        errors={errors}
        formatPrice
        type="number"
        required
      />
    </div>
  );
};

export default BodyContentPrice;
