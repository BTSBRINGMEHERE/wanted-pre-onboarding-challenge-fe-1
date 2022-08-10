import React, { useState } from "react";

interface IuseControlTodoFormProps {}

const useControlTodoForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    handleTitleChange,
    handleContentChange,
  };
};

export default useControlTodoForm;
