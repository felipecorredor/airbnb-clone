import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { BiMap } from "react-icons/bi";
import { BsChatLeftTextFill } from "react-icons/bs";

const Map = dynamic(() => import("../Map"));

type Category = {
  icon: IconType;
  label: string;
  description: string;
};

interface ListingInfoProps {
  currentUser?: SafeUser | null;
  category: Category | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  currentUser,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {currentUser?.name}</div>
          <Avatar src={currentUser?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="flex flex-row gap-4 items-center">
        <BsChatLeftTextFill size={35} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">Description</div>
          <div className="text-lg font-light text-neutral-500">
            {description}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-row gap-4 items-center">
        <BiMap size={40} className="text-neutral-600" />
        <div className="text-lg font-semibold">Location</div>
      </div>
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
