"use client";

import Heading from "@/app/components/Heading";
import Counter from "@/app/components/inputs/Counter";
import React from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";

interface BodyContentInfo {
  watch: UseFormWatch<FieldValues>;
  setCustomValue: (id: string, label: number) => void;
}

const BodyContentInfo: React.FC<BodyContentInfo> = ({
  watch,
  setCustomValue,
}) => {
  const watchGuestCount = watch("guestCount");
  const watchRoomCount = watch("roomCount");
  const watchBathroomCount = watch("bathroomCount");

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subtitle="What amenities do you have?"
      />
      <Counter
        title="Number or guests"
        subtitle="How many guests"
        value={watchGuestCount}
        onChange={(value: number) => setCustomValue("guestCount", value)}
      />
      <hr />
      <Counter
        title="Rooms"
        subtitle="How many rooms do you have?"
        value={watchRoomCount}
        onChange={(value: number) => setCustomValue("roomCount", value)}
      />
      <hr />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
        value={watchBathroomCount}
        onChange={(value: number) => setCustomValue("bathroomCount", value)}
      />
    </div>
  );
};

export default BodyContentInfo;
