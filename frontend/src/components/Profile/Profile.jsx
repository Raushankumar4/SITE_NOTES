import React from "react";
import { useGetProfile } from "../../hooks/useGetProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  useGetProfile();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="max-w-md md:mt-[10vw] mt-[20vw] mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold mb-2 capitalize">{user.name}</h2>
        <p className="text-gray-700 text-base mb-1">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-700 text-base mb-1">
          <span className="font-semibold">Branch:</span> {user.selectBranch}
        </p>
        <p className="text-gray-700 text-base mb-1">
          <span className="font-semibold">Role:</span> {user.role}
        </p>
        <p className="text-gray-700 text-base mb-1">
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-base mb-1">
          <span className="font-semibold">Updated At:</span>{" "}
          {new Date(user.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
