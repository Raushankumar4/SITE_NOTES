import React from "react";
import { useParams } from "react-router-dom";
import { useUpdateSessional } from "../../../hooks/useUpdateSessional";
import { InputArea } from "../../InputField/InputArea";
import SelectOption from "../../InputField/SelectOption";
import LoadingSpinner from "../../Loading/LoadingSpinner";

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
    <>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Update Sessional</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="col-span-1">
            <InputArea
              label="Title"
              name="title"
              onChange={handleOnChange}
              value={userInput.title}
            />
          </div>

          <div className="col-span-1">
            <InputArea
              label="Description"
              name="description"
              onChange={handleOnChange}
              value={userInput.description}
            />
          </div>

          <div className="col-span-1">
            <SelectOption
              label="Branch"
              name="branch"
              onChange={handleOnChange}
              value={userInput.branch}
              options={allBranches}
            />
          </div>

          <div className="col-span-1">
            <SelectOption
              label="Year"
              name="selectYear"
              onChange={handleOnChange}
              value={userInput.selectYear}
              options={yearOptions}
            />
          </div>

          <div className="col-span-1">
            <InputArea
              label="Sessional PDF"
              name="sessionalPdf"
              type="file"
              onChange={handleOnChange}
            />
          </div>

          {filePreview && (
            <div className="col-span-2 my-4">
              <iframe src={filePreview} className="w-full h-64 border"></iframe>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => setFilePreview(null)}
              >
                Remove
              </button>
            </div>
          )}

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateSessional;
