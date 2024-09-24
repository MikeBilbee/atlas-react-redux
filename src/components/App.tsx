//App.tsx
import Header from "./Header"
import Board from "./Board"
import Footer from "./Footer"
import { Provider } from 'react-redux';
import store from "../store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
          <div>
            <Board />
          </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
