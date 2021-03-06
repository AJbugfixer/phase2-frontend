import React from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { Routes, Route } from 'react-router-dom'
import DrinkList from "./components/DrinkList";
import NewMargarita from "./components/NewMargarita";
import MargaritaCard from "./components/MargaritaCard"
import { useState, useEffect } from "react";


function App() {

  const [margaritas, setMargaritas] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/margaritas`)
    .then(r => r.json())
    .then(margaritas => setMargaritas(margaritas))
  }, []);

  function addMargarita(newMargarita){
    setMargaritas([...margaritas,newMargarita])
  };

  function deleteRecipe(margarita) {
    const updatedMargaritas = margaritas.filter(marg => marg.id !== margarita.id)
    setMargaritas(updatedMargaritas)
  };

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/margaritas" element={<DrinkList margaritas={margaritas} />} />
        <Route path="/margaritas/:id"element={<MargaritaCard margaritas={margaritas} onDrinkDelete={deleteRecipe}/>}/>
        <Route path="/newmargarita" element={<NewMargarita onAddMargarita={addMargarita}/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
