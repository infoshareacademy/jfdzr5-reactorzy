import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}
