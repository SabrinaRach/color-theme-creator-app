import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";
import { initialThemes } from "./lib/themes";
import ThemeForm from "./Components/ThemeForm/ThemeForm";

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

  /* --- add new Theme --- */
  function addTheme(newTheme) {
    setThemes([...themes, newTheme]);
  }

  /* --- edit Theme --- */
  function editTheme(updatedTheme) {
    // not edit default theme
    if (updatedTheme.id === "t1") {
      return;
    }

    const updatedThemes = themes.map((theme) => {
      if (theme.id === updatedTheme.id) {
        return updatedTheme;
      } else {
        return theme;
      }
    });

    setThemes(updatedThemes);
  }

  /* --- delete Theme --- */
  function deleteTheme(id) {
    // not delete default theme
    if (id === "t1") {
      return;
    }

    // delete theme
    const updatedThemes = themes.filter((theme) => {
      return theme.id !== id;
    });

    setThemes(updatedThemes);

    // back to default theme if the deleted theme was active
    if (activeThemeId === id) {
      setActiveThemeId("t1");
    }
  }

  /* --- Contrast Checker --- */ /* with Error Handling */
  async function fetchContrast(fcolor, bcolor) {
    try {
      const response = await fetch(
        `https://webaim.org/resources/contrastchecker/?fcolor=${encodeURIComponent(fcolor)}&bcolor=${encodeURIComponent(bcolor)}&api=`,
      );

      if (!response.ok) {
        throw new Error(`Contrast API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("contrast response: ", data);
      return data;
    } catch (error) {
      console.error("Could not fetch contrast data:", error);

      return {
        ratio: "N/A",
        AA: "fail",
        /* AALarge: "fail",
      AAA: "fail",
      AAALarge: "fail", */
      };
    }
  }

  /*  to test if error handling works:
 - add sth wrong to API URL 
 - switch const data = await response.json() to await "kein json" */

  /* --- Add a color (with contrast checker) --- */
  async function addColor(newColor) {
    const contrast = await fetchContrast(newColor.contrastText, newColor.hex);

    const colorWithContrast = {
      ...newColor,
      ratio: contrast.ratio,
      AA: contrast.AA,
    };

    setColors((currentColors) => [colorWithContrast, ...currentColors]);

    /* color zu Theme hinzufügen */
    const updatedThemes = themes.map((theme) => {
      if (theme.id === activeThemeId) {
        return {
          ...theme,
          colors: [...theme.colors, colorWithContrast.id],
        };
      } else {
        return theme;
      }
    });
    setThemes(updatedThemes);
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

    /* map to change an object in array, filter to delete from an array */
    const updatedThemes = themes.map((theme) => {
      if (theme.id === activeThemeId) {
        return {
          ...theme,
          colors: theme.colors.filter((colorId) => colorId !== id),
        };
      } else {
        return theme;
      }
    });

    setColors(
      updatedColors,
    ); /* setColors changes the state. Only App owns the state, so only App can update i */
    setThemes(updatedThemes);
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
      <header>
        <h1 className="color-card-headline">Color Theme Creator</h1>

        <p className="description" id="page-description">
          Design your own color palettes, create multiple themes, and customize
          each project individually. Check contrast ratios and accessibility
          scores to ensure your colors are easy to read and visually consistent.
        </p>
      </header>
      <main aria-describedby="page-description">
        <div className="theme-selector-and-create-theme-container">
        <ThemeSelector
          themes={themes}
          activeThemeId={activeThemeId}
          onThemeChange={(event) => setActiveThemeId(event.target.value)}
          onDeleteTheme={deleteTheme}
          onEditTheme={editTheme}
        />
        <ThemeForm onAddTheme={addTheme} ariaLabel="Add new theme" />
</div>
        {/* form to add new colors */}
        <ColorForm onAddColor={addColor} ariaLabel="Add new color" />

        {/* If there are no colors left in the theme after deletion, display a message encouraging users to add new colors. */}
        {/*  for every color: create a Color component and add the matching color to this component 
      add key to uniquely identifiy each color card --> .map()*/}
        {activeThemeColors.length === 0 ? (
          <p className="add-colors-message" role="status">
            Add new colors!
          </p>
        ) : (
          <ul className="card-container">
            {activeThemeColors.map((color) => (
              <Color
                key={color.id}
                color={color}
                onDeleteColor={deleteColor}
                onEditColor={editColor}
              />
            ))}
          </ul>
        )}
        <div className="scroll-button-container">
          <button
            onClick={scrollToTop}
            className="scroll-to-top-button"
            aria-label="Scroll back to top"
          >
            ↑ Top
          </button>
        </div>
      </main>
    </>
  );
}
export default App;
