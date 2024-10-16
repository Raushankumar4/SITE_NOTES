import React from "react";
import { InputArea } from "../../InputField/InputArea";
import { useCreateSessionalPaper } from "../../../hooks/useCreateSessional";
import { useParams } from "react-router-dom";
import SelectOption from "../../InputField/SelectOption";
import Loading from "../../Loading/Loading";

const allBranches = [
  { value: "CSE", label: "CSE" },
  { value: "ECE", label: "ECE" },
  { value: "MECH", label: "MECH" },
  { value: "CE", label: "CE" },
  { value: "CIVIL", label: "CIVIL" },
  { value: "IT", label: "IT" },
];

const yearOptions = [
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
];

const CreateSessional = () => {
  const { id } = useParams();
  console.log("id", id);

  const {
    handleCreateSessional,
    hanldeOnChange,
    userInput,
    filePreview,
    setFilePreview,
    error,
    loading,
  } = useCreateSessionalPaper(id);

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Create Sessional</h1>
      <form onSubmit={handleCreateSessional}>
        <InputArea
          name="title"
          onChange={hanldeOnChange}
          value={userInput.title}
          label="Sessional Name"
          error={error.title}
        />
        <InputArea
          name="description"
          onChange={hanldeOnChange}
          value={userInput.description}
          label="Description"
          error={error.description}
        />
        <SelectOption
          options={allBranches}
          name="branch"
          onChange={hanldeOnChange}
          value={userInput.branch}
          label="Branch"
          error={error.branch}
        />
        <SelectOption
          options={yearOptions}
          name="selectYear"
          onChange={hanldeOnChange}
          value={userInput.selectYear}
          label="Select Year"
          error={error.selectYear}
        />
        <InputArea
          name="sessionalPdf"
          onChange={hanldeOnChange}
          label="Sessional Pdf"
          error={error.sessionalPdf}
          type="file"
          accept="application/pdf,image/*"
        />

        {filePreview && (
          <div className="mt-4 p-4 border border-gray-300 rounded bg-white">
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <iframe
              title="preview"
              src={filePreview}
              className="w-full h-64"
            ></iframe>
            <button
              onClick={() => setFilePreview(null)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        )}
        {loading ? (
          <Loading />
        ) : (
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Sessional
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateSessional;
