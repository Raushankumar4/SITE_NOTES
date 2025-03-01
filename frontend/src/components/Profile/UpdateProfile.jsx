import React, { useRef } from "react";
import { InputArea } from "../InputField/InputArea";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
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

  const fileInputRef = useRef();

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative border border-gray-300 dark:border-gray-700">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 text-gray-600 hover:text-blue-600 transition duration-300 dark:text-white"
            >
              <FaArrowLeft size={24} />
            </button>

            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-blue-400">
              Update Profile
            </h2>

            {/* Profile Image Display */}
            <div className="flex flex-col items-center mb-6 relative">
              <div className="relative">
                <img
                  src={profilePreview}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg object-cover"
                />
                <button
                  onClick={handleFileClick}
                  className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                >
                  <FaCamera size={16} />
                </button>
              </div>

              {profilePreview && (
                <button
                  className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-600 transition duration-300 dark:text-white"
                  type="button"
                  onClick={() => setProfilePreview(null)}
                >
                  &times;
                </button>
              )}
            </div>

            <form onSubmit={updateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <InputArea disabled value={user?.selectBranch} label="Branch" />
                <InputArea
                  onChange={handleOnChange}
                  name="phoneNumber"
                  value={data.phoneNumber}
                  label="Phone Number"
                />
              </div>

              {!profilePreview && (
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleOnChange}
                    className="hidden"
                    name="profile"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg dark:bg-blue-500 dark:text-gray-200 transition duration-300 shadow-lg hover:bg-blue-700"
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
