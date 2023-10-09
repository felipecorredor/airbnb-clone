"use client";

import Heading from "@/app/components/Heading";
import Calendar from "@/app/components/inputs/Calendar";
import React from "react";
import { Range } from "react-date-range";

interface BodyContentDateProps {
  value: Range;
  setDateRange: (value: Range) => void;
}

const BodyContentDate: React.FC<BodyContentDateProps> = ({
  value,
  setDateRange,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="When do you plan to go?"
        subtitle="Make sure everyone is free!"
      />
      <Calendar
        value={value}
        onChange={(value) => setDateRange(value.selection)}
      />
    </div>
  );
};

export default BodyContentDate;
