import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaUserCog, FaUserEdit } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {MdViewModule} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";

const MenuMod = ({ text, route }) => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logoutUser = () => {
    const action = {
      type: types.logout,
      payload: {},
    };

    dispatch(action);
    navigate("/");
  };

  const goToModDashboard = () =>{
    navigate("/ModsScreen");
  }

  const goToModDataPanel = () => {
    navigate(`${route}`);
  };

  const goToAdminPanel = () => {
    navigate("/AdminPanel");
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<GiHamburgerMenu />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<FaUserCog />} onClick={goToModDataPanel}>
          {text}
        </MenuItem>
        <MenuItem icon={<MdViewModule />} onClick={goToModDashboard}>
          Mod DashBoard
        </MenuItem>
        {user.rol === 2 ? (
          <MenuItem icon={<FaUserEdit />} onClick={goToAdminPanel}>
            Administrar Moderadores
          </MenuItem>
        ) : null}
        <MenuItem icon={<CgLogOut />} onClick={logoutUser}>
          Cerrar Sesion
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuMod;
