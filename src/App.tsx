import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout/AppLayout";
import { CreateAccountPage } from "./features/create-account/CreateAccountPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<CreateAccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
