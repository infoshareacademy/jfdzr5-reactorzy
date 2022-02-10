import { Content } from "./content";
import { UserContextProvider } from "./services/user-context";

function App() {
  return (
    <>
      <UserContextProvider>
        <Content />
      </UserContextProvider>
    </>
  );
}

export default App;
