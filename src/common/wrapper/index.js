import { flexbox } from "@mui/system";

export const Wrapper = ({ children }) => (
  <div
    style={{
      maxWidth: "1488px",
      margin: "0 auto",
    }}
  >
    {children}
  </div>
);
