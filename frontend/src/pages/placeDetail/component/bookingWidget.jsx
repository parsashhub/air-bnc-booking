import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../userContext.jsx";
import { Button } from "@mui/material";
import TextField from "../../../component/customTextField.jsx";
import { toast } from "react-toastify";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn),
    );
  }

  async function bookThisPlace() {
    try {
      const response = await axios.post("/api/bookings", {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place?._id,
        price: numberOfNights * place?.price,
      });
      const bookingId = response.data.data._id;
      setRedirect(`/profile/bookings/${bookingId}`);
      toast.success("place booked successfully");
    } catch (e) {
      toast.error(e.message);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place?.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <TextField
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            label="Number of guests"
            sx={{ marginY: "0.5rem" }}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <TextField
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              label="Your full name"
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              label="Phone number"
              sx={{ marginTop: "1rem" }}
            />
          </div>
        )}
      </div>
      <Button
        onClick={bookThisPlace}
        className="bg-primary"
        variant="contained"
        sx={{ borderRadius: "25px", marginTop: "1rem" }}
        fullWidth
      >
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place?.price}</span>}
      </Button>
    </div>
  );
}
