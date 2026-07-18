import React from "react";
import { Editor } from "primereact/editor";

const toolbarOptions = (
  <span className="ql-formats">
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-list" value="bullet" />
  </span>
);

const Input_Editor = ({ value, disabled, handleChange, item, error }) => {
  return (
    <div
      className={`w-full overflow-hidden h-full editor ${item?.className} ${
        error ? "error" : ""
      } `}
    >
      <Editor
        value={value}
        onTextChange={handleChange}
        readOnly={disabled}
        headerTemplate={toolbarOptions}

        // className="h-full"
      />
    </div>
  );
};

export default Input_Editor;
