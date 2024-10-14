import React from "react";
import { InputArea } from "../InputField/InputArea";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { updateProfile, handleOnChange, data, loading } = useUpdateProfile();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <FaArrowLeft size={24} />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center">
              Update Profile
            </h2>
            <form onSubmit={updateProfile}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <InputArea
                  onChange={handleOnChange}
                  name="fullName"
                  value={data.fullName}
                  label="Name"
                />
                <InputArea
                  onChange={handleOnChange}
                  name="email"
                  value={data.email}
                  label="Email"
                />
                <InputArea
                  onChange={handleOnChange}
                  disabled
                  value={user?.selectBranch}
                  label="Branch"
                />
                <InputArea
                  onChange={handleOnChange}
                  name="phoneNumber"
                  value={data.phoneNumber}
                  label="Phone Number"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
