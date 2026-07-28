import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className="my-20 font-semibold">No Connections Found</h1>;

  return (
    <div className="text-center my-20">
      <h1 className="text-2xl">Connections</h1>
      <div className="flex flex-col gap-2.5 items-center my-5">
        {connections.map((connection) => {
          const { firstName, lastName, about, photoUrl, _id, age, gender } =
            connection;
          return (
            <ul
              key={_id}
              className="list bg-accent text-white rounded-box shadow-md w-1/2"
            >
              <li className="list-row items-center">
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
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
