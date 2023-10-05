import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import { IListingParams, getListings } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import { getCurrentUser } from "./actions/getCurrentUser";
import { SafeListing, SafeUser } from "./types";

interface HomeProps {
  searchParams: IListingParams;
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const listings = (await getListings(searchParams)) as SafeListing[];
  const currentUser = (await getCurrentUser()) as SafeUser;

  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24 
            grid 
            grid-cols-2 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            2xl:grid-cols-6 
            gap-8"
        >
          {listings.map((listing: SafeListing) => {
            return (
              <ListingCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
