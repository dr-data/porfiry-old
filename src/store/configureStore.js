import { applyMiddleware, createStore, compose } from 'redux';
import { devTools } from 'redux-devtools';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

function configureStore() {
  const store = compose(
    // To apply middleware later on, do:
    applyMiddleware(thunk),
    // devTools()
  )(createStore)(rootReducer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;
