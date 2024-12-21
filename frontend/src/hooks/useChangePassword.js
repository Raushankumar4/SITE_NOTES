import { useState } from "react";

export const useChangePassword = (userId) => {
  const [userInput, setUserInput] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState({});

  const validateForm = () => {
    let newError = {};
    if (!userInput.currentPassword) {
      newError.currentPassword = "required";
    }
    if (!userInput.newPassword) {
      newError.newPassword = "required";
    }

    setError(newError);
    return Object.keys(newError).length === 0 ? null : newError;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hanldeUpdatePassword = (e) => {
    e.preventDefault();
    const validate = validateForm();
    if (validate) return;
    console.log(userInput);
  };

  return { handleOnChange, userInput, hanldeUpdatePassword, error };
};
