import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../profile/_component/image";
import { Skeleton } from "../../component/index.js";

const Home = () => {
  const { data: places, isLoading, error } = usePlacesList();

  if (isLoading)
    return (
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6]?.map((place) => (
          <div key={place}>
            <div className="bg-gray-300 h-72 mb-2 rounded-2xl flex">
              <Skeleton className="rounded-2xl" />
            </div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ))}
      </div>
    );

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places?.map((place) => (
        <Link to={"/place/" + place._id} key={place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <Image
                className="rounded-2xl object-cover aspect-square"
                src={place.photos?.[0]}
                alt=""
              />
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
};

export const usePlacesList = () =>
  useQuery({
    queryKey: ["placesList"],
    queryFn: () => axios.get("/api/places/list").then((res) => res.data?.data),
    retry: 1,
    staleTime: 60 * 1000 * 60, // 1 hour
  });

export default Home;
