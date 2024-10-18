import React from "react";
import { useUpdateSemesterPaper } from "../../../hooks/useUpdateSemester";
import { InputArea } from "../../InputField/InputArea";
import SelectOption from "../../InputField/SelectOption";
import { useParams } from "react-router-dom";

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
    {
      value: "I",
      label: "I",
    },
    {
      value: "II",
      label: "II",
    },
    {
      value: "III",
      label: "III",
    },
    {
      value: "IV",
      label: "IV",
    },
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
    <div className="mt-20">
      <form onSubmit={handleOnUpdate}>
        <InputArea
          label="Semseter Name"
          name="title"
          onChange={handleOnChange}
          value={userInput.title}
        />
        <InputArea
          label="Semseter Descrption"
          name="description"
          onChange={handleOnChange}
          value={userInput.description}
        />
        <SelectOption
          options={options}
          name="branch"
          label="Branch"
          onChange={handleOnChange}
          value={userInput.branch}
        />

        <SelectOption
          options={yearOptions}
          name="selectYear"
          label="Select Year"
          onChange={handleOnChange}
          value={userInput.selectYear}
        />
        {!filePreview && (
          <InputArea
            type="file"
            name="notesPdf"
            accept="application/pdf,image/*"
            label="Seminar Notes"
            onChange={handleOnChange}
            className="mt-4  placeholder:text-gray-400 placeholder-shown:text-gray-800 "
          />
        )}
        {filePreview && (
          <div className="mb-4">
            <iframe
              className="w-full h-64 md:h-80 border"
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

        <button type="submit" className="bg-blue-700 text-white rounded-xl p-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateNotes;
