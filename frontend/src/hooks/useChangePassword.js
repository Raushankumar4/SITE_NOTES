import { useState } from "react";

export const useChangePassword = (userId) => {
  const [userInput, setUserInput] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleOnChange = (e) => {
    console.log(e);

    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hanldeUpdatePassword = (e) => {
    e.preventDefault();
    console.log(userInput);
  };

  return { handleOnChange, userInput, hanldeUpdatePassword };
};
