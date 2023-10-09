"use client";

import Heading from "@/app/components/Heading";
import Counter from "@/app/components/inputs/Counter";
import React from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";

interface BodyContentInfoProps {
  watch: UseFormWatch<FieldValues>;
  setCustomValue: (id: string, label: number) => void;
}
const BodyContentInfo: React.FC<BodyContentInfoProps> = ({
  watch,
  setCustomValue,
}) => {
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  return (
    <div className="flex flex-col gap-8">
      <Heading title="More information" subtitle="Find your perfect place!" />

      <Counter
        title="Guest Count"
        subtitle="How many guests are coming?"
        value={guestCount}
        onChange={(value: number) => setCustomValue("guestCount", value)}
      />

      <Counter
        title="Room Count"
        subtitle="How many rooms do you need?"
        value={roomCount}
        onChange={(value: number) => setCustomValue("roomCount", value)}
      />

      <Counter
        title="Bathroom Count"
        subtitle="How many bathrooms do you need?"
        value={bathroomCount}
        onChange={(value: number) => setCustomValue("bathroomCount", value)}
      />
    </div>
  );
};

export default BodyContentInfo;
