import React from "react";
import { useParams } from "react-router-dom";
import { useUpdateSessional } from "../../../hooks/useUpdateSessional";
import { InputArea } from "../../InputField/InputArea";
import SelectOption from "../../InputField/SelectOption";

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
const UpdateSessional = () => {
  const { id } = useParams();

  const {
    loading,
    filePreview,
    setFilePreview,
    userInput,
    handleOnChange,
    handleSubmit,
  } = useUpdateSessional(id);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputArea
          label="Title"
          name="title"
          onChange={handleOnChange}
          value={userInput.title}
        />

        <InputArea
          label="Description"
          name="description"
          onChange={handleOnChange}
          value={userInput.description}
        />

        <SelectOption
          label="Branch"
          name="branch"
          onChange={handleOnChange}
          value={userInput.branch}
          options={allBranches}
        />

        <SelectOption
          label="Year"
          name="selectYear"
          onChange={handleOnChange}
          value={userInput.selectYear}
          options={yearOptions}
        />

        <InputArea
          label="Sessional PDF"
          name="sessionalPdf"
          type="file"
          onChange={handleOnChange}
        />
        {filePreview && (
          <div className="my-4">
            <iframe src={filePreview} className="w-full h-96"></iframe>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setFilePreview(null)}
            >
              remove
            </button>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateSessional;
