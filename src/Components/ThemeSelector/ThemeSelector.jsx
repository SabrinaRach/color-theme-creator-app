export default function ThemeSelector({
  themes,
  activeThemeId,
  onThemeChange,
  onDeleteTheme,
}) {
  /* handleThemeChange() */

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
      <button
        className="delete-theme-button"
        type="button"
        onClick={() => onDeleteTheme(activeThemeId)}
        disabled={activeThemeId === "t1"}
      >
        Delete Theme
      </button>
    </>
  );
}
