import React from "react";
import { useCreateSem } from "../../../hooks/useCreateSem";
import { InputArea } from "../../InputField/InputArea";
import SelectOption from "../../InputField/SelectOption";

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

  const {
    createSem,
    handleOnChange,
    filePreview,
    setFilePreview,
    handleOnCreate,
    loadings,
    error,
  } = useCreateSem();

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Seminar</h1>
      <form onSubmit={handleOnCreate}>
        <h2 className="text-lg font-semibold mb-4">
          Seminar Notes (only pdf and image)
        </h2>

        <InputArea
          label="Semester Name"
          value={createSem.title}
          onChange={handleOnChange}
          name="title"
          error={error.title}
        />

        <InputArea
          label="Seminar Description"
          value={createSem.description}
          onChange={handleOnChange}
          name="description"
          error={error.description}
        />

        <SelectOption
          options={options}
          name="branch"
          label="Branch"
          onChange={handleOnChange}
          value={createSem.branch}
          error={error.branch}
        />

        <SelectOption
          options={yearOptions}
          name="selectYear"
          label="Select Year"
          onChange={handleOnChange}
          value={createSem.selectYear}
          error={error.selectYear}
        />

        {!filePreview && (
          <InputArea
            type="file"
            name="notesPdf"
            accept="application/pdf,image/*"
            label="Seminar Notes"
            onChange={handleOnChange}
            error={error.notesPdf}
            className="mt-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 placeholder:text-gray-400 placeholder-shown:text-gray-800"
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
            disabled={loadings}
            className="mb-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={() => setFilePreview(null)}
          >
            Remove
          </button>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateSem;
