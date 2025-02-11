//App.tsx
import React from 'react';
import Header from "./Header"
import Board from "./Board"
import Footer from "./Footer"
import { Provider } from 'react-redux';
import { store, persistor } from "../store/store";
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}> 
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

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
