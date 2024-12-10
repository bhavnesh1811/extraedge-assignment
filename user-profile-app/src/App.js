import "./App.css";
import SearchBar from "./components/SearchBar";
import SortComponent from "./components/SortComponent";
import ViewToggle from "./components/ViewToggle";

function App() {
  return (
    <div
      className="App"
      style={{
        padding: "10px",
        maxWidth: "90vw",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px",
          padding: "16px",
          justifyContent: "space-around",
        }}
      >
        <div style={{ flex: "1 1 200px" }}>
          <SearchBar />
        </div>
        <div
          style={{
            flex: "1 1 200px",
            display: "inline-flex",
            justifyContent: "flex-end",
          }}
        >
          <SortComponent />
        </div>
      </div>
      <ViewToggle />
    </div>
  );
}

export default App;
