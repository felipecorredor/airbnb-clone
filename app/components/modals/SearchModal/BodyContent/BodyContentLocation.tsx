"use client";

import Heading from "@/app/components/Heading";
import CountrySelect, {
  CountrySelectValue,
} from "@/app/components/inputs/CountrySelect";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

interface BodyContentLocationProps {
  location?: CountrySelectValue;
  setLocation: (value: CountrySelectValue) => void;
}

const BodyContentLocation: React.FC<BodyContentLocationProps> = ({
  location,
  setLocation,
}) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../../../Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
};

export default BodyContentLocation;
