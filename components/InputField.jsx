import React from "react";
import styled from "styled-components";

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 6px 10px;
  border: 1px solid #a3a8ac;
  box-sizing: border-box;
  &.error {
    border-color: red;
  }
`;

const Label = styled.label`
  display: block;
  color: #768692;
  font-size: 13px;
  font-family: Arial;
  margin: 10px 0;
  &.error {
    color: red;
  }
  .error-message {
    font-size: 10px;
  }
`;

const InputField = ({ children, touched, error, ...rest }) => {
  let hasError = touched && error;
  return (
    <Label className={hasError ? "error" : ""}>
      {children}
      <Input className={hasError ? "error" : ""} {...rest} />
      {hasError ? <span className="error-message">{error}</span> : null}
    </Label>
  );
};

export default InputField;
