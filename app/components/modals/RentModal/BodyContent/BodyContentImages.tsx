"use client";

import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import React from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";

interface BodyContentImagesProps {
  watch: UseFormWatch<FieldValues>;
  setCustomValue: (id: string, label: string) => void;
}

const BodyContentImages: React.FC<BodyContentImagesProps> = ({
  watch,
  setCustomValue,
}) => {
  const watchImageSrc = watch("imageSrc");

  console.log("watchImageSrc::", watchImageSrc);

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />
      <ImageUpload
        onChange={(value) => setCustomValue("imageSrc", value)}
        value={watchImageSrc}
      />
    </div>
  );
};

export default BodyContentImages;
