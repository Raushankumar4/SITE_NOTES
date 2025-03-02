import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateSem } from "../../../hooks/useCreateSem";
import { InputArea } from "../../InputField/InputArea";
import SelectOption from "../../InputField/SelectOption";
import Loading from "../../Loading/Loading";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import { FaFilePdf, FaRegFileAlt, FaPen, FaBookOpen } from "react-icons/fa";

const CreateSem = () => {
  const options = [
    { value: "CSE", label: "CSE" },
    { value: "ECE", label: "ECE" },
    { value: "EEE", label: "EEE" },
    { value: "MECH", label: "MECH" },
    { value: "CIVIL", label: "CIVIL" },
    { value: "IT", label: "IT" },
    { value: "EIE", label: "EIE" },
    { value: "CHEMICAL", label: "CHEMICAL" },
    { value: "BIOTECH", label: "BIOTECH" },
    { value: "OTHERS", label: "OTHERS" },
  ];

  const yearOptions = [
    { value: "1st", label: "1st" },
    { value: "2nd", label: "2nd" },
    { value: "3rd", label: "3rd" },
    { value: "4th", label: "4th" },
  ];

  const [showModal, setShowModal] = useState(false);
  const {
    createSem,
    handleOnChange,
    filePreview,
    setFilePreview,
    handleOnCreate,
    loadings,
    error,
    setCreateSem,
  } = useCreateSem();

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      {loadings ? (
        <Loading />
      ) : (
        <div className="h-screen flex justify-center items-center p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl dark:bg-[#363636] shadow-xl rounded-lg p-6">
            <div className="flex justify-center items-center">
              <img
                className="w-full h-auto object-cover rounded-lg"
                src="https://r2.erweima.ai/imgcompressed/img/compressed_b81b5e12da85f091f83a70bdf15cf51c.webp"
                alt="Seminar"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-center mb-4 dark:text-[#0F3BFE]">
                Add Semester Note
              </h1>
              <form onSubmit={handleOnCreate} className="space-y-4">
                <div className="mb-4">
                  <InputArea
                    value={createSem.title}
                    onChange={handleOnChange}
                    name="title"
                    error={error.title}
                    placeholder="Enter Semester Name"
                    icon={<FaPen />} // Icon for title
                  />
                </div>
                <div className="mb-4">
                  <InputArea
                    value={createSem.description}
                    onChange={handleOnChange}
                    name="description"
                    error={error.description}
                    placeholder="Enter Description"
                    icon={<FaBookOpen />} // Icon for description
                  />
                </div>
                <div className="grid grid-cols-1 lg:mx-0 sm:mx-6 xs:text-red-900 md:text-blue-700 sm:text-red-700 sm:gap-4 lg:pl-3 md:pl-0 sm:pl-6 md:grid-cols-2 gap-2 md:mx-1">
                  <div className="text-start">
                    <SelectOption
                      options={options}
                      name="branch"
                      label="Branch"
                      onChange={handleOnChange}
                      value={createSem.branch}
                      error={error.branch}
                    />
                  </div>
                  <div>
                    <SelectOption
                      options={yearOptions}
                      name="selectYear"
                      label="Select Year"
                      onChange={handleOnChange}
                      value={createSem.selectYear}
                      error={error.selectYear}
                    />
                  </div>
                </div>

                <div>
                  {!filePreview && (
                    <div>
                      <InputArea
                        type="file"
                        name="notesPdf"
                        accept="application/pdf,image/*"
                        label="Attach your Notes(pdf)"
                        onChange={handleOnChange}
                        error={error.notesPdf}
                        icon={<FaFilePdf />} // Icon for file upload
                        className="file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                      />
                    </div>
                  )}
                  {filePreview && (
                    <button
                      type="button"
                      disabled={loadings}
                      className="text-xl dark:text-[#e5e6e8] text-black"
                      onClick={() => {
                        setFilePreview(null);
                        setCreateSem({ ...createSem, notesPdf: null });
                      }}
                    >
                      &#10006; remove file
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loadings}
                  className="w-1/3 mr-4 dark:bg-[#0F3BFE] bg-[#000000] text-white py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  {loadings ? <LoadingSpinner /> : "Create"}
                </button>
                {createSem.notesPdf && (
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="w-1/3 dark:bg-[#0F3BFE] bg-[#000000] text-white py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                  >
                    Show Preview
                  </button>
                )}
              </form>
            </div>
          </div>

          <AnimatePresence>
            {showModal && (
              <motion.div
                className="fixed bg-[#000] inset-0 flex justify-center items-center bg-opacity-50"
                onClick={toggleModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="dark:bg-[#363636] bg-[#e5e6e8] rounded-lg p-4 w-11/12 md:w-1/3"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h2 className="text-xl font-bold mb-2 text-[#0F3BFE]">
                    File Preview
                  </h2>
                  <iframe
                    className="w-full h-64 border"
                    src={filePreview}
                    title="File preview"
                  ></iframe>
                  <button
                    onClick={toggleModal}
                    disabled={loadings}
                    className="mt-4 dark:bg-[#0F3BFE] bg-[#000000] rounded-xl text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                  >
                    {loadings ? "Loading..." : "Close"}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default CreateSem;
