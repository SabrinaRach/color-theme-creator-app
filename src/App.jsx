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

  /* delete colorcard if the id of the color card matches the id passed to this function
  = delete colorcard if the id of the color card is NOT kept in the filtered array */
  function deleteColor({ id }) {
    const updatedColors = colors.filter((color) => {
      return color.id !== id;
    });

    setColors(
      updatedColors,
    ); /* setColors changes the state. Only App owns the state, so only App can update i */
  }

  return (
    <>
      <h1 className="color-card-headline">Color Theme Creator</h1>

      {/* form to add new colors */}
      <ColorForm onAddColor={addColor} />

      {/* If there are no colors left in the theme after deletion, display a message encouraging users to add new colors. */}
      {/*  for every color: create a Color component and add the matching color to this component 
      add key to uniquely identifiy each color card --> .map()*/}
      {colors.length === 0 ? (
        <p className="add-colors-message">Add new colors!</p>
      ) : (
        colors.map((color) => (
          <Color key={color.id} color={color} onDeleteColor={deleteColor} />
        ))
      )}
    </>
  );
}
export default App;
