"use client";

import React, { useMemo, useState } from "react";
import Modal from "../Modal";
import useRentModal from "@/app/hooks/useRentModal";

import { FieldValues, useForm } from "react-hook-form";

import BodyContentCategory from "./BodyContent/BodyContentCategory";
import BodyContentLocation from "./BodyContent/BodyContentLocation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface ComponentMap {
  [STEPS.CATEGORY]: JSX.Element;
  [STEPS.LOCATION]: JSX.Element;
  [STEPS.INFO]: JSX.Element;
  [STEPS.IMAGES]: JSX.Element;
  [STEPS.DESCRIPTION]: JSX.Element;
  [STEPS.PRICE]: JSX.Element;
}

const DEFAULT_VALUES = {
  category: "",
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: "",
  price: 1,
  title: "",
  description: "",
};

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const watchCategory = watch("category");
  const watchLocation = watch("location");

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const isSecondaryAction = useMemo(
    () => (step === STEPS.CATEGORY ? undefined : onBack),
    [step]
  );

  const setCustomValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const componentsByStep: ComponentMap = {
    [STEPS.CATEGORY]: (
      <BodyContentCategory
        watchCategory={watchCategory}
        setCustomValue={setCustomValue}
      />
    ),
    [STEPS.LOCATION]: (
      <BodyContentLocation
        watchLocation={watchLocation}
        setCustomValue={setCustomValue}
      />
    ),
    [STEPS.INFO]: <div>INFO</div>,
    [STEPS.IMAGES]: <div>IMAGES</div>,
    [STEPS.DESCRIPTION]: <div>DESCRIPTION</div>,
    [STEPS.PRICE]: <div>PRICE</div>,
  };

  const bodyContent = componentsByStep[step];

  return (
    <Modal
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={isSecondaryAction}
      body={bodyContent}
    />
  );
};

export default RentModal;
