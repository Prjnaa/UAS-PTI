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
    <img
      className="navbtn drop-shadow-text transition-all duration-200 transform hover:-translate-y-1 hover:scale-105"
      src={props.imgURL}
      alt={props.alt}
      onClick={handleLogout}
    />
  );
}

export default Logout;
