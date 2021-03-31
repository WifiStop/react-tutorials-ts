import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from "react-router-config"
import routes from './routes';
import './style/index.scss';
const store = configureStore()


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
    {renderRoutes(routes)}
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);


