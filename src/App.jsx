import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";
import { initialThemes } from "./lib/themes";

function App() {
  /* choose between themes */
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [activeThemeId, setActiveThemeId] =
    useState("t1"); /* shows the default theme */

  /* switch useState for useLocalStorageState */
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  /* find the active theme */
  const activeTheme = themes.find((theme) => {
    return theme.id === activeThemeId;
  });

  const activeThemeColors = colors.filter((color) => {
    return activeTheme?.colors.includes(
      color.id,
    ); /* ? bedeutet: nur ausführen, wenn activeTheme existiert */
  });

  /* --- Contrast Checker --- */
  async function fetchContrast(fcolor, bcolor) {
    const response = await fetch(
      `https://webaim.org/resources/contrastchecker/?fcolor=${encodeURIComponent(fcolor)}&bcolor=${encodeURIComponent(bcolor)}&api=`,
    );

    const data = await response.json();
    console.log("contrast response: ", data);
    return data;
  }

  /* --- Add a color (with contrast checker) --- */
  async function addColor(newColor) {
    const contrast = await fetchContrast(newColor.contrastText, newColor.hex);

    const colorWithContrast = {
      ...newColor,
      ratio: contrast.ratio,
      AA: contrast.AA,
    };

    setColors([colorWithContrast, ...colors]);
  }

  /* --- Edit a color (with contrast checker --- */
  async function editColor(updatedColor) {
    const contrast = await fetchContrast(
      updatedColor.contrastText,
      updatedColor.hex,
    );

    const updatedColorsWithContrast = {
      ...updatedColor,
      ratio: contrast.ratio,
      AA: contrast.AA,
    };

    const updatedColors = colors.map((color) => {
      if (color.id === updatedColorsWithContrast.id) {
        return updatedColorsWithContrast;
      } else {
        return color;
      }
    });

    setColors(updatedColors);
  }

  /* --- Delete a color --- */
  /* delete color card if the id of the color card matches the id passed to this function
  = delete color card if the id of the color card is NOT kept in the filtered array */
  function deleteColor({ id }) {
    const updatedColors = colors.filter((color) => {
      return color.id !== id;
    });

    setColors(
      updatedColors,
    ); /* setColors changes the state. Only App owns the state, so only App can update i */
  }

  /* to scroll back to the top of the page */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <h1 className="color-card-headline">Color Theme Creator</h1>

      <ThemeSelector
        themes={themes}
        onThemeChange={(event) => setActiveThemeId(event.target.value)}
      />

      {/* form to add new colors */}
      <ColorForm onAddColor={addColor} ariaLabel="Add new color" />

      {/* If there are no colors left in the theme after deletion, display a message encouraging users to add new colors. */}
      {/*  for every color: create a Color component and add the matching color to this component 
      add key to uniquely identifiy each color card --> .map()*/}
      {activeThemeColors.length === 0 ? (
        <p className="add-colors-message">Add new colors!</p>
      ) : (
        <div className="card-container">
          {activeThemeColors.map((color) => (
            <Color
              key={color.id}
              color={color}
              onDeleteColor={deleteColor}
              onEditColor={editColor}
            />
          ))}
        </div>
      )}
      <div className="scroll-button-container">
        <button onClick={scrollToTop} className="scroll-to-top-button">
          ↑ Top
        </button>
      </div>
    </>
  );
}
export default App;
