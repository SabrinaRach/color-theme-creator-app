import { useState } from "react";
import {
  Pencil,
  Trash2
} from "lucide-react"; /* for icon in edit and delete button */

export default function ThemeSelector({
  themes,
  activeThemeId,
  onThemeChange,
  onDeleteTheme,
  onEditTheme,
}) {
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    /* creating a dropdown menu, using map() to create an <option> element for each theme */
    <div className="theme-selector-container">
      <label htmlFor="theme-select" className="choose-a-theme">
        Themes:{" "}
      </label>
      <select
        name="themes"
        id="theme-select"
        value={activeThemeId}
        className="theme-dropdown"
        onChange={onThemeChange}
      >
        <option value="">-Please choose a theme-</option>
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>

      <button
        className="edit-theme-button"
        type="button"
        aria-label="Edit Theme"
        onClick={() => setIsEditing(true)}
        disabled={activeThemeId === "t1"}
      >
        <Pencil size={20} />
      </button>

      <button
        className="delete-theme-button"
        type="button"
        aria-label="Delete theme"
        onClick={() => onDeleteTheme(activeThemeId)}
        disabled={activeThemeId === "t1"}
      >
        <Trash2 size={20} />
      </button>

      {/* edit form after clicking the edit buttton */}
      {isEditing && (
        <div>
          <input
            className="new-theme-name-input-field"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="New theme name"
            required
          />

          <button
            className="save-new-theme-name-button"
            type="button"
            disabled={
              !newName.trim()
            } /* disabled as long there is no text input */
            onClick={() => {
              const themeToEdit = themes.find(
                (theme) => theme.id === activeThemeId,
              );

              onEditTheme({
                ...themeToEdit,
                name: newName,
              });

              setNewName("");
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button
            className="cancel-renaming-theme-button"
            type="button"
            onClick={() => {
              setNewName("");
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
