"use client";

import Heading from "@/app/components/Heading";

import CountrySelect, {
  CountrySelectValue,
} from "@/app/components/inputs/CountrySelect";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

interface BodyContentLocationProps {
  watchLocation: CountrySelectValue;
  setCustomValue: (id: string, label: string) => void;
}

const BodyContentLocation: React.FC<BodyContentLocationProps> = ({
  watchLocation,
  setCustomValue,
}) => {
  const Map = useMemo(
    () => dynamic(() => import("@/app/components/Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watchLocation]
  );

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guest find you!"
      />

      <CountrySelect
        value={watchLocation}
        onChange={(value: any) => setCustomValue("location", value)}
      />
      <Map center={watchLocation?.latlng} />
    </div>
  );
};

export default BodyContentLocation;
