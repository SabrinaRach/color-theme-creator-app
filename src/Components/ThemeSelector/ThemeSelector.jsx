import { useState } from "react";

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
    <>
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
        <option value="">--Please choose a theme--</option>
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>

      <button className="edit-theme-button"
        type="button"
        onClick={() => setIsEditing(true)}
        disabled={activeThemeId === "t1"}
      >
        Edit Theme
      </button>

      <button
        className="delete-theme-button"
        type="button"
        onClick={() => onDeleteTheme(activeThemeId)}
        disabled={activeThemeId === "t1"}
      >
        Delete Theme
      </button>

      {/* edit form after clicking the edit buttton */}
      {isEditing && (
        <>
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="New theme name"
          />

          <button className="save-new-theme-name-button"
            type="button"
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
        </>
      )}
    </>
  );
}
