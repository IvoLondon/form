import * as React from "react";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);®

  border-top: 2px solid #026cdf;
  border-right: 2px solid #026cdf;
  border-bottom: 2px solid #026cdf;
  border-left: 3px solid #0251a7;
  background: transparent;
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const LoadingContainer = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.96);
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .wrapper {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    border-radius: 5px;
    background-color: #f5f5f5;
  }
`;

const Loading = ({ loading }) => {
  return loading ? (
    <LoadingContainer>
      <div data-testid="loading" className="wrapper">
        <Spinner />
      </div>
    </LoadingContainer>
  ) : null;
};

export default Loading;
