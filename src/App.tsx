import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { Main } from "./components/Main";
import { SubstitutionMethodForm } from "./pages/lb_1/SubstitutionMethodForm";
import { PermutationMethodForm } from "./pages/lb_2/PermutationMethodForm";
import { GammingMethodForm } from "./pages/lb_3/GammingMethodForm";
import { ECBMethodForm } from "./pages/lb_4/ECBMethodForm";
import { CBCMethodForm } from "./pages/lb_5/CBCMethodForm";
import { CFBMethodForm } from "./pages/lb_6/CFBMethodForm";
import { OFBMethodForm } from "./pages/lb_7/OFBMethodForm";
import { SteganographicMethod } from "./pages/lb_8/SteganographicMethod";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Main />}>
				<Route path="1" element={<SubstitutionMethodForm />} />
				<Route path="2" element={<PermutationMethodForm />} />
				<Route path="3" element={<GammingMethodForm />} />
				<Route path="4" element={<ECBMethodForm />} />
				<Route path="5" element={<CBCMethodForm />} />
				<Route path="6" element={<CFBMethodForm />}/>
				<Route path="7" element={<OFBMethodForm />}/>
				<Route path="8" element={<SteganographicMethod />}/>
			</Route>
		</Routes>
	);
}

export default App;
