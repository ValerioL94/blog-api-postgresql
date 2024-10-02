import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';
import Main from './MainSection';

const GlobalLayout = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default GlobalLayout;
