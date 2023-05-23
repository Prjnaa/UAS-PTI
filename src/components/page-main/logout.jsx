import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then((result) => {
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <button
      className=" bg-dgreen p-3 w-36 text-white rounded-lg"
      type="button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
