const UserCard = ({ user }) => {
  console.log(user);
  const { about, firstName, lastName, photoUrl, skills, age, gender } = user;
  return (
    <div className="card bg-base-300 w-80 shadow-sm text-center">
      <figure>
        <img className="w-full m-3" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title self-center">{firstName + " " + lastName}</h2>
       {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
