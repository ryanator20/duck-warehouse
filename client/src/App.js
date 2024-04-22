import React, { useState } from 'react'
import Warehouse from './components/Warehouse'
import './App.css';

function App() {
  // we want to keep track of the current tab and change the tab when the user clicks on a different tab
  const [currentTab, setCurrentTab] = useState('warehouse')
  // we want to keep track of the ducks in the warehouse and update the warehouse when the user adds or deletes a duck. Ducks are stored on the server, so we need to make a request to the server to get the ducks in the warehouse

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <button onClick={() => setCurrentTab('warehouse')}>Warehouse</button>
          <button onClick={() => setCurrentTab('store')}>Store</button>
        </nav>
        {/* {currentTab === 'store' && <Store />} */}
      </header>
      <div className='App-Page'>
        {currentTab === 'warehouse' && <Warehouse />}
      </div>
    </div>
  );
}

export default App;
