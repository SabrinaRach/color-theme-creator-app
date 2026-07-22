import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import { nanoid } from "nanoid"; /* to give every color an unique id */
import { useState } from "react";

export default function ColorForm({ onAddColor }) {
  const [hex, setHex] = useState("#000000");
  const [contrastText, setContrastText] = useState("#ffffff");

  /* when user submits the form: */
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const colorFormData = Object.fromEntries(formData);
    const newColor = {
      id: nanoid(),
      ...colorFormData,
    }; /* add unique id to colorFormData object */
    console.log(newColor);
    onAddColor(newColor);
    setHex("#000000"); /* sets it back to new state = default value for hex */
    setContrastText(
      "#ffffff",
    ); /* sets it back to new state = default value for contrast text */
    event.target.reset(); /* to empty the input fields */
  }
  return (
    /* Creating a form to submit colors to a new theme */
    <form onSubmit={handleSubmit} className="color-form">
      <label htmlFor="role">Role</label>
      <input
        type="text"
        name="role"
        id="role"
        placeholder="the role of the color"
        required
      />

      <label htmlFor="hex">Hex</label>
      <ColorInput
        /* type="text" name="hex"  */ id="hex"
        value={hex}
        onChange={(event) => setHex(event.target.value)}
        required
      />

      <label htmlFor="contrastText">Contrast Text</label>
      <ColorInput
        /* type="text"
        name="contrastText" */
        id="contrastText"
        value={contrastText}
        onChange={(event) => setContrastText(event.target.value)}
        required
      />

      <button className="add-color-button">Add color</button>
    </form>
  );
}
