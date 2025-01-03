import React from "react";
import { useSelector } from "react-redux";

const CurrentUserAvatar = ({className=""}) => {
    const currentUser = useSelector((state) => state.auth.userData);
    // console.log("currentUser", currentUser);
  return (
    <>
      <img
        className={` border-white rounded-[50%]  ${className}`}
        src={currentUser?.avatar}
        alt="img"
      />
    </>
  );
};

export default CurrentUserAvatar;
