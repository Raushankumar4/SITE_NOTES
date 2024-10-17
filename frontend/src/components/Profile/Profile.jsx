import React from "react";
import { useSelector } from "react-redux";
import { SERVER } from "../../constant";
import { Link } from "react-router-dom";
import { useGetProfile } from "../../hooks/useGetProfile";

const Profile = () => {
  useGetProfile();
  const { user } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg dark:bg-[#363636] mx-auto my-10 p-5 bg-[#EFEFEF]  rounded-lg shadow-md border border-gray-300">
      <div className="flex flex-col items-center">
        <img
          className="w-32 h-32 rounded-full mb-4 border-4 border-[#5b5d5e] dark:border-blue-500"
          src={`${SERVER}/${user?.profile}`}
          alt="User Profile"
        />
        <h2 className="dark:text-blue-600 text-[#070809] text-3xl font-semibold capitalize mb-2">
          {user?.fullName}
        </h2>
        <p className="text-gray-600 dark:text-[#d2cbcb]">
          Branch: <span className="font-medium">{user?.selectBranch}</span>
        </p>
        <p className="text-gray-600 dark:text-[#d2cbcb]">
          Role: <span className="font-medium">{user?.role}</span>
        </p>
        <p className="text-gray-600 dark:text-[#d2cbcb]">
          Email: <span className="font-medium">{user?.email}</span>
        </p>
        <p className="text-gray-600 dark:text-[#d2cbcb]">
          Phone: <span className="font-medium">{user?.phoneNumber}</span>
        </p>
        <p className="text-gray-600 dark:text-[#d2cbcb]">
          Joining date:{" "}
          <span className="font-medium">
            {new Date(user?.createdAt).toLocaleDateString()}
          </span>
        </p>
        <Link
          to="update"
          className="mt-6 no-underline px-6 py-2 bg-[#070809] dark:bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition duration-200"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
