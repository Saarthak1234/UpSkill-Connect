import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Connect from './Connect/Connect';
import DoubtSolver from './Doubts/Doubts';
import Counselling from './Counselling/Counselling';
import Signup from './SignUp/SignUp';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './index.css'; // Ensure Tailwind is included

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/counselling" element={<Counselling />} />
        <Route path="/doubts" element={<DoubtSolver />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
