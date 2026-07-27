import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests Found</h1>;

  return (
    <div className="my-10">
      <h1 className="text-2xl text-center">Requests</h1>
      <div className="flex flex-col gap-2.5 items-center my-5">
        {requests?.map((request) => {
          console.log(request);
          const { firstName, lastName, about, photoUrl, _id, age, gender } =
            request.fromUserId;
          return (
            <ul
              key={_id}
              className="list bg-black text-white rounded-box shadow-md w-1/2 p-1"
            >
              <li className="list-row">
                <div>
                  <img className="size-10 rounded-2xl" src={photoUrl} />
                </div>
                <div>
                  <div>
                    <h1 className="font-extrabold">
                      {firstName + " " + lastName}
                    </h1>
                    {age && gender && <p>{age + " " + gender}</p>}
                  </div>
                  <div className="text-sm font-bold">{about}</div>
                </div>
                <button className="btn btn-square btn-secondary w-full p-2">
                  Accept
                </button>
                <button className="btn btn-square btn-primary w-full p-2">
                  Reject
                </button>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
