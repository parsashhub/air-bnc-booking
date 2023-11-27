import Image from "./Image.jsx";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover rounded-l-[25px]";
  }
  return <Image className={className} src={place.photos[index]} alt="" />;
};

export default PlaceImg;
