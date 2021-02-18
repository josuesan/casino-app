import React, { useReducer, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import HomePage from '../../pages/HomePage';
import Footer from '../Footer';
import Header from '../Header';
import { userReducer } from '../../reducers/userReducer';

const init = () => JSON.parse(localStorage.getItem('user')) || { logged: false, balance: 100, record: [] };

function Layout() {
  const [user, dispatch] = useReducer(userReducer, {}, init);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <div className="App">
        <ToastContainer />
        <Header />
        <div className="body-page">
          <HomePage />
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default Layout;
