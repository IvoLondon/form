import React from "react";
import styled from "styled-components";

const Button = styled.button`
  color: white;
  font-size: 13px;
  font-weight: 300;
  font-family: Arial;
  margin: 15px 0;
  border: 0;
  display: block;
  cursor: pointer;
  width: 100%;
  min-height: 36px;
  background-color: #026cdf;
  &:hover {
    background-color: #0251a7;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const ButtonComponent = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};

export default ButtonComponent;
