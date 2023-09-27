"use client";

import React, { useMemo, useState } from "react";
import Modal from "../Modal";
import useRentModal from "@/app/hooks/useRentModal";

import { FieldValues, useForm } from "react-hook-form";

import BodyContentCategory from "./BodyContent/BodyContentCategory";
import BodyContentLocation from "./BodyContent/BodyContentLocation";
import BodyContentInfo from "./BodyContent/BodyContentInfo";
import { CountrySelectValue } from "../../inputs/CountrySelect";
import BodyContentImages from "./BodyContent/BodyContentImages";
import BodyContentDescription from "./BodyContent/BodyContentDescription";
import BodyContentPrice from "./BodyContent/BodyContentPrice";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = async (data: FieldValues) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);

    try {
      const response = await axios.post("/api/listings", data);
      if (response.statusText === "OK") {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      }
    } catch (error) {
      toast.error("something went wrong.");
    } finally {
      setIsLoading(false);
    }
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

  const setCustomValue = (
    id: string,
    value: string | number | CountrySelectValue
  ) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const componentsByStep: ComponentMap = {
    [STEPS.CATEGORY]: (
      <BodyContentCategory watch={watch} setCustomValue={setCustomValue} />
    ),
    [STEPS.LOCATION]: (
      <BodyContentLocation watch={watch} setCustomValue={setCustomValue} />
    ),
    [STEPS.INFO]: (
      <BodyContentInfo watch={watch} setCustomValue={setCustomValue} />
    ),
    [STEPS.IMAGES]: (
      <BodyContentImages watch={watch} setCustomValue={setCustomValue} />
    ),
    [STEPS.DESCRIPTION]: (
      <BodyContentDescription
        register={register}
        errors={errors}
        isLoading={isLoading}
      />
    ),
    [STEPS.PRICE]: (
      <BodyContentPrice
        register={register}
        errors={errors}
        isLoading={isLoading}
      />
    ),
  };

  const bodyContent = componentsByStep[step];

  return (
    <Modal
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={isSecondaryAction}
      body={bodyContent}
    />
  );
};

export default RentModal;
