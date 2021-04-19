import React from "react";
import styled from "styled-components";

const Message = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.96);
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  h2 {
    font-size: 20px;
    font-weight: 700;
    font-family: Arial;
    text-align: center;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
`;

const MessageComponent = (props) => {
  return (
    <Message>
      <h2>{props.children}</h2>
    </Message>
  );
};

export default MessageComponent;
