type TypeCount = {
  gte: number;
};

export interface IListingParams {
  userId?: string;
  guestCount?: number | TypeCount;
  roomCount?: number | TypeCount;
  bathroomCount?: number | TypeCount;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export interface QueryListing extends IListingParams {
  NOT?: {
    reservations: {
      some: {
        OR: [
          {
            endDate: { gte: string };
            startDate: { lte: string };
          },
          {
            startDate: { lte: string };
            endDate: { gte: string };
          }
        ];
      };
    };
  };
}
