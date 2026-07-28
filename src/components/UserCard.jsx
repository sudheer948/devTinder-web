import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, profile }) => {
  console.log(profile);
  const { _id, about, firstName, lastName, photoUrl, skills, age, gender } =
    user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="card bg-base-300 w-80 shadow-sm text-center my-20 h-9/12">
      <figure>
        <img className="w-full m-3" src={photoUrl} alt="photoUrl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title self-center">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() =>
              !profile ? handleSendRequest("ignored", _id) : null
            }
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() =>
              !profile ? handleSendRequest("interested", _id) : null
            }
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
