import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import kendoka from './kendoka.svg';
import './App.scss';
import { Header } from './header/header';
import { FoodList } from './components/foodList';
import { FoodView } from './components/foodView';
import { Routes, Route } from 'react-router-dom';

function App() {
  const handleClick = React.useCallback(() => {
    window.open('https://www.telerik.com/kendo-react-ui/components/', '_blank');
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/food/:id/view" element={<FoodView />} />
      </Routes>

    </div>
  );
}

export default App;
