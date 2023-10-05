import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
}

interface Query extends IListingParams {}

export const getListings = async (params: IListingParams) => {
  try {
    const { userId } = params;

    let query: Query = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = (await listings).map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
};
