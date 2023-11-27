import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import PlaceImg from "./_component/placeImage";
import { Paper, Typography } from "@mui/material";
import { Skeleton } from "../../component/index.js";
import { toast } from "react-toastify";
import ProfileNavbar from "./_component/profileNavbar.jsx";

const Places = () => {
  const { data: places, error, isLoading } = usePlaces();

  if (error) toast.error(error.message);

  return (
    <div>
      <ProfileNavbar />
      <AddNewPlace />
      <div className="mt-4">
        {isLoading && <LoadingSkeleton />}
        {places?.map((place) => (
          <Paper key={place._id} sx={{ borderRadius: "25px" }} elevation={5}>
            <Link
              to={"/profile/places/" + place._id}
              className="flex cursor-pointer gap-4 rounded-2xl my-4"
            >
              <div className="flex w-32 min-h-32 shrink-0 ">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink my-6">
                <Typography variant="h5">{place?.title}</Typography>
                <Typography variant="body1" className="mt-2">
                  {place?.description}
                </Typography>
              </div>
            </Link>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export const LoadingSkeleton = () => {
  return (
    <>
      <Paper sx={{ borderRadius: "25px" }} elevation={5}>
        <div className="flex gap-4 my-4 items-center">
          <div className="">
            <Skeleton className="w-32 h-32 rounded-l-[25px]" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-8 rounded-full my-2" />
            <Skeleton className="h-8 rounded-full my-2" />
          </div>
        </div>
      </Paper>
      <Paper sx={{ borderRadius: "25px" }} elevation={5}>
        <div className="flex gap-4 my-4 items-center">
          <div className="">
            <Skeleton className="w-32 h-32 rounded-l-[25px]" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-8 rounded-full my-2" />
            <Skeleton className="h-8 rounded-full my-2" />
          </div>
        </div>
      </Paper>
    </>
  );
};

const AddNewPlace = () => {
  return (
    <div className="text-center">
      <Link
        className="inline-flex items-center gap-1 bg-primary text-white py-2 px-6 rounded-full"
        to={"/profile/places/new"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
        Add new place
      </Link>
    </div>
  );
};

export const usePlaces = () =>
  useQuery({
    queryKey: ["places"],
    queryFn: () => axios.get("/api/places").then((res) => res.data?.data),
    retry: 0,
    staleTime: 0,
  });

export default Places;
