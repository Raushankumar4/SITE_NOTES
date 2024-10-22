import React from "react";
import { useUpdateSemesterPaper } from "../../../hooks/useUpdateSemester";
import { InputArea } from "../../InputField/InputArea";
import SelectOption from "../../InputField/SelectOption";
import { useParams } from "react-router-dom";
import { FaUpload } from "react-icons/fa";

const UpdateNotes = () => {
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
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
  ];

  const { id } = useParams();

  const {
    setFilePreview,
    filePreview,
    handleOnUpdate,
    handleOnChange,
    userInput,
    loading,
  } = useUpdateSemesterPaper(id);

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-semibold mb-6">Update Note</h1>
      <form
        onSubmit={handleOnUpdate}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <InputArea
            label="Semester Name"
            name="title"
            onChange={handleOnChange}
            value={userInput.title}
            required
          />
        </div>
        <div>
          {" "}
          <InputArea
            label="Semester Description"
            name="description"
            onChange={handleOnChange}
            value={userInput.description}
            required
          />
        </div>
        <div className="lg:mx-20 md:mx-4  ">
          {" "}
          <SelectOption
            options={options}
            name="branch"
            label="Branch"
            onChange={handleOnChange}
            value={userInput.branch}
            required
          />
        </div>
        <div className="lg:mx-20 md:mx-4 ">
          <SelectOption
            options={yearOptions}
            name="selectYear"
            label="Select Year"
            onChange={handleOnChange}
            value={userInput.selectYear}
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          {!filePreview && (
            <div className="flex items-center">
              <InputArea
                type="file"
                name="notesPdf"
                accept="application/pdf,image/*"
                label="Seminar Notes"
                onChange={handleOnChange}
                className="flex-grow"
              />
              <button
                type="button"
                className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                <FaUpload />
              </button>
            </div>
          )}
          {filePreview && (
            <div className="mb-4">
              <iframe
                className="w-full h-64 border rounded-lg"
                src={filePreview}
                title="File preview"
              ></iframe>
            </div>
          )}
          {filePreview && (
            <button
              type="button"
              className="mb-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => setFilePreview(null)}
            >
              Remove
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full md:col-span-2 bg-blue-700 text-white rounded-xl p-2 hover:bg-blue-600 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateNotes;
