import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("male");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex my-10 gap-3 justify-center">
        <div className="flex justify-center">
          <div className="card bg-black text-primary-content w-96 p-2">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-primary-content">
                    First Name
                  </legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input text-black"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-primary-content">
                    Last Name
                  </legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input text-black"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-primary-content">
                    Photo URL:
                  </legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input text-black"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <div className="flex gap-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-primary-content">
                      Age
                    </legend>
                    <input
                      type="text"
                      value={age}
                      className="input text-black"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-primary-content">
                      Gender
                    </legend>
                    <input
                      type="text"
                      value={gender}
                      className="input text-black"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </fieldset>
                </div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-primary-content">
                    About
                  </legend>
                  <input
                    type="text"
                    value={about}
                    className="input text-black"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn" onClick={saveProfile}>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
     {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
