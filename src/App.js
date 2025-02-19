import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store';
import Routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  
  const localCart = JSON.parse(localStorage.getItem('dioshopping: cart'))
  
  if(localCart !== null) {
    store.dispatch({type: 'CHANGE_CART', localCart})
  }
  
  return(
    <Provider store={store}>
        <Router>
          <Header />
          <Routes />
          <Footer />
        </Router>
    </Provider>
  )
}

export default App;
