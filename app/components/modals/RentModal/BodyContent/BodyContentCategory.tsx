"use client";

import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import { categories } from "@/app/globals/categories";
import React from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";

interface BodyContentProps {
  watch: UseFormWatch<FieldValues>;
  setCustomValue: (id: string, label: string) => void;
}

const BodyContentCategory: React.FC<BodyContentProps> = ({
  watch,
  setCustomValue,
}) => {
  const watchCategory = watch("category");

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((category) => (
          <div key={category.label} className="col-span-1">
            <CategoryInput
              onClick={setCustomValue}
              selected={category.label === watchCategory}
              {...category}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyContentCategory;
