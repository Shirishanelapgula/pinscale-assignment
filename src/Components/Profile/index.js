import "./index.css";

const Profile = (props) => {
  const { data } = props;
  const {
    country,
    name,
    date_of_birth,
    email,
    permanent_address,
    postal_code,
    present_address,
  } = data;

  return (
    <div className="profile-container ">
      <img
        src="https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690814646/790e98129931897251abd3915a931233_ppztfv.jpg"
        alt="profile"
        className="profile"
      />
      <div>
        <div>
          <p className="input-tags">Your Name</p>
          <p className="inputs">{name}</p>
        </div>
        <div>
          <p className="input-tags">Email</p>
          <p className="inputs">{email}</p>
        </div>
        <div>
          <p className="input-tags">Date Of Birth</p>
          <p className="inputs">{date_of_birth}</p>
        </div>
        <div>
          <p className="input-tags">Permanent Address</p>
          <p className="inputs">{permanent_address}</p>
        </div>
        <div>
          <p className="input-tags">Postal Code</p>
          <p className="inputs">{postal_code}</p>
        </div>
      </div>
      <div>
        <div>
          <p className="input-tags">User Name</p>
          <p className="inputs">{name}</p>
        </div>
        <div>
          <p className="input-tags">Password</p>
          <p className="inputs">******</p>
        </div>
        <div>
          <p className="input-tags">present Address</p>
          <p className="inputs">{present_address}</p>
        </div>
        <div>
          <p className="input-tags">City</p>
          <p className="inputs">{permanent_address}</p>
        </div>
        <div>
          <p className="input-tags">Country</p>
          <p className="inputs">{country}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
