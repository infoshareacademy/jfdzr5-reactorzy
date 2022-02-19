import { Content } from "./content";
import { UserContextProvider } from "./services/user-context";
import { Navigation } from "./navigation";
import { Wrapper } from "./common/wrapper";

function App() {
  return (
    <>
      <UserContextProvider>
        <Navigation />
        <Wrapper>
          <Content />
        </Wrapper>
      </UserContextProvider>
    </>
  );
}

export default App;
