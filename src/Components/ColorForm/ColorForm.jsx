import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import { nanoid } from "nanoid"; /* to give every color an unique id */
import { useState } from "react";

export default function ColorForm({
  onAddColor,
  onEditColor,
  onFinishEdit,
  color,
}) {
  const [hex, setHex] = useState(
    color ? color.hex : "#000000",
  ); /* If a color exists (edit mode), use the current hex value. Otherwise (add mode), use the default value "#000000". */
  const [contrastText, setContrastText] = useState(
    color ? color.contrastText : "#ffffff",
  );
  const [role, setRole] = useState(color ? color.role : "");

  /* when user submits the form: */
  function handleSubmit(event) {
    console.log("submit funktioniert");
    event.preventDefault();
    const formData = new FormData(event.target);
    const colorFormData = Object.fromEntries(formData);
    const editedColor = {
      id: color ? color.id : nanoid(),
      ...colorFormData,
    }; /* add unique id to colorFormData object with nanoid()*/
    console.log(editedColor);

    if (color) {
      onEditColor(editedColor);
      onFinishEdit();
    } else {
      onAddColor(editedColor);
    }

    setHex("#000000"); /* sets it back to new state = default value for hex */
    setContrastText(
      "#ffffff",
    ); /* sets it back to new state = default value for contrast text */
    setRole("");
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
        value={role}
        placeholder="the role of the color"
        onChange={(event) => setRole(event.target.value)}
        required
      />

      <label htmlFor="hex">Hex</label>
      <ColorInput
        type="text"
        name="hex"
        id="hex"
        value={hex}
        onChange={(event) => setHex(event.target.value)}
        required
      />

      <label htmlFor="contrastText">Contrast Text</label>
      <ColorInput
        type="text"
        name="contrastText"
        id="contrastText"
        value={contrastText}
        onChange={(event) => setContrastText(event.target.value)}
        required
      />

      <button className="add-color-button">
        {color ? "Save changes" : "Add color"}
      </button>

{/* the cancel button should close the edit form without any changes */}
      {color && (
        <button type="button" className="cancel-button" onClick={onFinishEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
