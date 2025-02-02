import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Connect from './Connect/Connect';
import DoubtSolver from './Doubts/Doubts';
import Counselling from './Counselling/Counselling';
import Signup from './SignUp/SignUp';
import VerifyOTP from './SignUp/verifyOTP';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AIChat from './Components/Chatbot';

import './index.css'; // Ensure Tailwind is included
import LobbyScreen from './Call/Lobby';
import RoomPage from './Call/Room';

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
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/chat" element={<AIChat />} />
        <Route path='/lobby' element={<LobbyScreen/>}/>
        <Route path='/room/:roomid' element={<RoomPage/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
