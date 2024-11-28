import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { MyContextProvider } from './context/myContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import OnlineShop from './pages/onlineShop/onlineShop';

function App() {
  return (
    <MyContextProvider>
        <BrowserRouter>
          <div className='app'>
              <Header />
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='online-shop' element={<OnlineShop />} />
              </Routes>
              <Footer />
          </div>
        </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
