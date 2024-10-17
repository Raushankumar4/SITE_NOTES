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
  const {
    updateProfile,
    handleOnChange,
    data,
    loading,
    profilePreview,
    setProfilePreview,
  } = useUpdateProfile();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-[#EFEFEF] dark:bg-[#363636] p-6">
          <div className="bg-[#EFEFEF] dark:bg-[#363636] dark:text-[#0F3BFE] rounded-lg shadow-lg p-8 sm:p-10 w-full max-w-md sm:max-w-2xl relative border border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 text-gray-500 hover:text-blue-600 transition duration-300  dark:text-[#fdfdff] "
            >
              <FaArrowLeft size={24} />
            </button>

            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800  dark:text-[#0F3BFE] ">
              Update Profile
            </h2>

            {/* Profile Image Display */}
            <div className="flex justify-center mb-6 relative">
              <img
                src={profilePreview || user?.profilePicture}
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-gray-300 shadow-lg"
              />
              {profilePreview && (
                <button
                  className="text-3xl absolute top-0 right-0 text-gray-500 hover:text-red-600 transition duration-300 dark:text-[#fdfdff] "
                  type="button"
                  onClick={() => setProfilePreview(null)}
                >
                  &times;
                </button>
              )}
            </div>

            <form onSubmit={updateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              {!profilePreview && (
                <InputArea
                  onChange={handleOnChange}
                  name="profile"
                  label="Change Profile Picture"
                  type="file"
                  accept="image/*"
                />
              )}

              <button
                type="submit"
                className="mt-4 w-full bg-[#000000] text-white py-2 rounded-lg dark:bg-[#0F3BFE] dark:text-[#d6d7de]  transition duration-300 shadow-lg"
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
