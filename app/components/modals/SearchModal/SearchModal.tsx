"use client";

import React, { useCallback, useMemo, useState } from "react";
import Modal from "../Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import { CountrySelectValue } from "../../inputs/CountrySelect";
import qs from "query-string";
import { formatISO, set } from "date-fns";
import BodyContentDate from "./BodyContent/BodyContentDate";
import BodyContentInfo from "./BodyContent/BodyContentInfo";
import BodyContentLocation from "./BodyContent/BodyContentLocation";
import Heading from "../../Heading";
import { FieldValues, useForm } from "react-hook-form";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const DEFAULT_VALUES = {
  guestCount: 0,
  roomCount: 0,
  bathroomCount: 0,
};

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { setValue, watch, reset } = useForm<FieldValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const setCustomValue = (id: string, value: number) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const onBack = useCallback(() => {
    setStep((prevStep) => prevStep - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    console.log("SEARCH_MODAL_URL:::", url);

    setStep(STEPS.LOCATION);
    reset();
    searchModal.onClose();
    router.push(url);
  }, [
    bathroomCount,
    dateRange,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
    reset,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = {
    [STEPS.LOCATION]: (
      <BodyContentLocation location={location} setLocation={setLocation} />
    ),
    [STEPS.DATE]: (
      <BodyContentDate value={dateRange} setDateRange={setDateRange} />
    ),
    [STEPS.INFO]: (
      <BodyContentInfo watch={watch} setCustomValue={setCustomValue} />
    ),
  };

  return (
    <Modal
      onClose={searchModal.onClose}
      isOpen={searchModal.isOpen}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      body={bodyContent[step]}
    />
  );
};

export default SearchModal;
