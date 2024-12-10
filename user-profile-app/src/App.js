import "./App.css";
import SearchBar from "./components/SearchBar";
import SortComponent from "./components/SortComponent";
import ViewToggle from "./components/ViewToggle";

function App() {
  
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          padding: "16px",
          overflow: "hidden",
        }}
      >
        <SearchBar />
        <SortComponent />
      </div>
      <ViewToggle />
    </div>
  );
}

export default App;
