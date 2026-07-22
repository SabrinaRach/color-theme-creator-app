import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);
  function addColor(newColor) {
    setColors([newColor, ...colors]);
  }

  return (
    <>
      <h1 className="color-card-headline">Color Theme Creator</h1>

      {/* form to add new colors */}
      <ColorForm onAddColor={addColor} />

      {/* for every color: create a Color component and add the matching color to this component 
      add key to uniquely identifiy each color card*/}
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
    </>
  );
}

export default App;
