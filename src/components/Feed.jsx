import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  console.log(feed);

  if (!feed) return;

  if (feed?.length === 0)
    return <h1 className="text-center text-2xl my-20">No new users found!</h1>;

  return (
    feed && (
      <div className="grid justify-center relative">
        <UserCard user={feed[0]} profile={false}/>
      </div>
    )
  );
};

export default Feed;
