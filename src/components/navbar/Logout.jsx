import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <button className="navbtn drop-shadow-text shake-hover" onClick={handleLogout}>
    <img
      className="navbtn-icon"
      src={props.imgURL}
      alt={props.alt}
    />
  </button>
  );
}

export default Logout;
