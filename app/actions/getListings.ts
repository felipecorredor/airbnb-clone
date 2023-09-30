import prisma from "@/app/libs/prismadb";

export const getListings = async () => {
  try {
    const listings = prisma.listing.findMany({
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
