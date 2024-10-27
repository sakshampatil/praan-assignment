import Logo from "../assets/logo.svg";
import { IoLogOutOutline } from "react-icons/io5";
import { useLogoutMutation } from "../store/services/authApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout({});
    navigate("/login");
  };

  return (
    <div className="flex flex-row justify-between items-center px-4">
      <div className="flex flex-row gap-2 items-center">
        <img src={Logo} className="w-24 h-24" />
        <div className="w-px h-16 bg-gray-300 "></div>
        <span className="font-semibold text-lg">Full Stack Task</span>
      </div>
      <div className="cursor-pointer" onClick={handleLogout}>
        <span className="text-3xl">
          <IoLogOutOutline />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
