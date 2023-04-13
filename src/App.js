import Header from './pages/header/Header';
import Footer from './pages/footer/Footer';
import MainRoutes from './routes/MainRoutes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './pages/home/service/HomeApi';


function App() {
  
  const dispatch = useDispatch();
 
  return (
 <>
 <Header />
  <MainRoutes/>
 <Footer />
 </>
  );
}

export default App;
