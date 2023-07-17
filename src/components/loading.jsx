import * as React from "react";
import { css } from "@emotion/react";
import { styled } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";

const loadingStateStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #d0d0ce;
  color: #3c1053;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  list-style-type: none;
`;

const StyledLoadingButton = styled(LoadingButton)`
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  background-color: #3c1053;
  color: #fff;
  &:hover {
    transform: scale(1.1);
    background-color: #3c1053;
    color: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    cursor: pointer;
    transition: 0.3s;
  }
`;

export default function LoadingState() {
  return (
    <div css={loadingStateStyles}>
      <StyledLoadingButton
        variant="contained"
        color="primary"
        loading
        loadingIndicator="Loading..."
      >
        Loading...
      </StyledLoadingButton>
    </div>
  );
}
