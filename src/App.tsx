import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout/AppLayout";
import { CreateAccountPage } from "./features/create-account/CreateAccountPage";
import { ViewBalancePage } from "./features/view-balance/ViewBalancePage";
import { SendMoneyPage } from "./features/send-money/SendMoneyPage";
import { NotFoundPage } from "./features/not-found/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<CreateAccountPage />} />
          <Route path="balance" element={<ViewBalancePage />} />
          <Route path="transfer" element={<SendMoneyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
