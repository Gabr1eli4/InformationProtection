import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { Main } from "./components/Main";
import { SubstitutionMethodForm } from "./pages/lb_1/SubstitutionMethodForm";
import { PermutationMethodForm } from "./pages/lb_2/PermutationMethodForm";
import { GammingMethodForm } from "./pages/lb_3/GammingMethodForm";
import { ECBMethodForm } from "./pages/lb_4/ECBMethodForm";
import { CBCMethodForm } from "./pages/lb_5/CBCMethodForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="1" element={<SubstitutionMethodForm />} />
        <Route path="2" element={<PermutationMethodForm />} />
        <Route path="3" element={<GammingMethodForm />} />
        <Route path="4" element={<ECBMethodForm />} />
        <Route path="5" element={<CBCMethodForm />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
