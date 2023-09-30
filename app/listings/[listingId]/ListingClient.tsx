"use client";

import { Reservation } from "@prisma/client";

import { SafeListing, SafeUser } from "@/app/types";
import React, { useMemo } from "react";
import { categories } from "@/app/globals/categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface ListingClientProps {
  reservations?: Reservation[];
  listing: SafeListing;
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead currentUser={currentUser} {...listing} />
          <div
            className="
            grid 
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6
          "
          >
            <ListingInfo
              {...listing}
              category={category}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
