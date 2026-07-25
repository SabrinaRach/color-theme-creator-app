import { useState } from "react";
import { nanoid } from "nanoid";

export default function ThemeForm({ onAddTheme }) {
const [nameTheme, setNameTheme] = useState("");

function handleSubmit(event) {
    event.preventDefault();

    const newTheme = {
      id: nanoid(),
      name: nameTheme,
      colors: [],
    };

    onAddTheme(newTheme);

    setNameTheme("");
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className="theme-selector-container">
      <label htmlFor="theme-name" className="theme-name">Create theme: </label>

      <input className="input-theme-name"
        id="theme-name"
        name="theme-name"
        value={nameTheme}
        onChange={(event) => setNameTheme(event.target.value)}
        placeholder="Enter theme name"
        required
      />

      <button className="add-theme-button">✓</button>
      </div>
    </form>
  );
}