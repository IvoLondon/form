import React from "react";
import styled from "styled-components";

const Heading = styled.h1`
  font-size: 23px;
  font-weight: 700;
  font-family: Arial;
`;

const HeadingComponent = ({ children }) => <Heading>{children}</Heading>;

export default HeadingComponent;
