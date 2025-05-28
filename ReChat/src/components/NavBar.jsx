import { Router, Route } from "react-router-dom";

function App() {
  return (
    <div>
        <Router>
            <Route path="/home" element={<HomePage />}/>
            <Route path="/singup" element={<SingupPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/settings" element={<SettingsPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
        </Router>

    </div>
  );
}

export default App;