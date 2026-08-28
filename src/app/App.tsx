import QueryProvider from "./providers/QueryProvider";
import "@/shared/styles";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";

const App = () => {
  return (
    <BrowserRouter>
      <QueryProvider>
        <Routing />
      </QueryProvider>
    </BrowserRouter>
  );
};

export default App;
