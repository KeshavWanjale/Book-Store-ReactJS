import RoutingMoudule from "./RoutingMoudule";
import store from "./redux/store";
import { Provider } from 'react-redux'

function App() {
  return (
    <div>
      <Provider store={store}>
        <RoutingMoudule />
      </Provider>

    </div>
  );
}

export default App;
