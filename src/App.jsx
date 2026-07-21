import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      // display colors here
      {/* for every color: create a Color component and add the matching color to this component */}
      {initialColors.map((color) => <Color color={color} /> )}
    </>
  );
}

export default App;
