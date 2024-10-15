import React from "react";
import { InputArea } from "../../InputField/InputArea";
import { useCreateSessionalPaper } from "../../../hooks/useCreateSessional";
import { useParams } from "react-router-dom";

const CreateSessional = () => {
  const { id } = useParams();
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
    <div>
      CreateSessional
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
      <InputArea
        name="branch"
        onChange={hanldeOnChange}
        value={userInput.branch}
        label="Branch"
        error={error.branch}
      />
      <InputArea
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
      <button
        disabled={loading}
        onClick={handleCreateSessional}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Sessional
      </button>
      {filePreview && (
        <div>
          <h1>Preview</h1>
          <iframe
            title="preview"
            src={filePreview}
            width="100%"
            height="100%"
          ></iframe>
          <button
            onClick={() => setFilePreview(null)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateSessional;
