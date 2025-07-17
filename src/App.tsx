import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout/AppLayout";
import { CreateAccountPage } from "./features/create-account/CreateAccountPage";
import { ViewBalancePage } from "./features/view-balance/ViewBalancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<CreateAccountPage />} />
          <Route path="balance" element={<ViewBalancePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
