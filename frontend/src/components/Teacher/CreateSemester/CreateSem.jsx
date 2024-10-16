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
    <div className="h-screen flex justify-center items-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl bg-gray-100 shadow-lg rounded-lg p-6">
        <div className="flex justify-center items-center">
          <img
            className="w-full h-auto object-cover rounded-lg"
            src="https://r2.erweima.ai/imgcompressed/img/compressed_b81b5e12da85f091f83a70bdf15cf51c.webp"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center mb-4">
            Add Semester Note
          </h1>
          <form onSubmit={handleOnCreate} className="space-y-4">
            <div>
              <InputArea
                label="Semester Name"
                value={createSem.title}
                onChange={handleOnChange}
                name="title"
                error={error.title}
              />
            </div>

            <div>
              <InputArea
                label="Aboout Semester"
                value={createSem.description}
                onChange={handleOnChange}
                name="description"
                error={error.description}
              />
            </div>

            <div>
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

            <div>
              {!filePreview && (
                <InputArea
                  type="file"
                  name="notesPdf"
                  accept="application/pdf,image/*"
                  label="Seminar Notes"
                  onChange={handleOnChange}
                  error={error.notesPdf}
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
            </div>

            <button
              type="submit"
              className="w-full bg-[#000000] text-white py-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSem;
