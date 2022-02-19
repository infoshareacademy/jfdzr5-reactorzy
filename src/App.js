import { Content } from "./content";
import { UserContextProvider } from "./services/user-context";
import { Navigation } from "./navigation";

function App() {
  return (
    <>
      <UserContextProvider>
        <Navigation />
        <Content />
      </UserContextProvider>
    </>
  );
}

export default App;
