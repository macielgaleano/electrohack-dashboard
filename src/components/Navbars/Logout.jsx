import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionLogout } from "../../Redux/actions/actionLogout";

const Logout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.admin.token);
  const logout = () => {
    dispatch(actionLogout());
  };
  let link;
  if (!token) {
    link = <></>;
  } else {
    link = (
      <Link to="/" onClick={logout}>
        Logout
      </Link>
    );
  }

  return link;
};

export default Logout;
