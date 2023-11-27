import { useParams } from "react-router-dom";

const PlaceDetail = () => {
  const { id } = useParams();
  return <div>place detail {id}</div>;
};

export default PlaceDetail;
