import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import { Pencil, Trash2 } from "lucide-react"; /* for icon in edit and delete button */

/* Each color card displays: siehe dafür colors.js
hex value of the color
the role of the color
the color itself in the background color of the element
the font in the respective contrastText color */

export default function Color({ color, onDeleteColor, onEditColor }) {
  /* The card that the user wants to delete shows a confirmation message.
   The state is located in Color because the confirmation is only needed
   for one card, not for the whole app. */
  const [showConfirmation, setShowConfirmation] = useState(false);
  /* Introduce a state for the edit, default value = false because color card is not in edit mode */
  const [showEdit, setShowEdit] = useState(false);

  function handleShowConfirmation() {
    setShowConfirmation(true);
  }

  function handleShowEdit() {
    setShowEdit(true);
  }

  function handleFinishEdit() {
    setShowEdit(false);
  }

  return (
    <article
      className="color-card"
      aria-label={`Color ${color.role}`}
      style={{
        backgroundColor: color.hex,
        color: color.contrastText,
      }}
    >
      <div className="hex-container">
        <p className="hex-text">{color.hex}</p>
        <CopyToClipboard
          text={color.hex}
          aria-label={`Copy ${color.hex} to clipboard`}
        />
      </div>

      <p className="role-text">{color.role}</p>
      <p className="contrast-text">contrast: {color.contrastText}</p>

      {/* Use the AA field as the overall pass/fail indicator and ratio to show the numeric contrast value */}
      <p className="contrast-checker">
        Overall Contrast Score:{" "}
        <span
          className={color.AA === "pass" ? "contrast-pass" : "contrast-fail"}
        >
          {color.AA === "pass" ? "good" : "needs adjustment"}
        </span>{" "}
        (Ratio: {color.ratio}){" "}
      </p>

      {showEdit ? (
        <ColorForm
          color={color}
          onEditColor={onEditColor}
          onFinishEdit={handleFinishEdit} /* closes the edit mode */
        />
      ) : (
        <>
          {showConfirmation === true ? (
            <>
              <p className="confirmation-message" role="alert">
                Are you sure?
              </p>
              <button
                onClick={() => onDeleteColor({ id: color.id })}
                className="confirm-button"
                aria-label={`Delete ${color.role} color`}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="cancel-button"
                aria-label="Cancel deleting color"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div
                className="delete-edit-button-container"
                role="group"
                aria-label="Color actions"
              >
                <button
                  onClick={handleShowConfirmation}
                  className="delete-button"
                >
                  <Trash2 size={20} />
                </button>
                <button onClick={handleShowEdit} className="edit-button">
                  <Pencil size={20} />
                </button>
              </div>
            </>
          )}
        </>
      )}
    </article>
  );
}
