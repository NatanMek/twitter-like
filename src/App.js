import "./App.css";
import Sidebar from "./components/layout/UI/Sidebar";
import Feed from "./pages/Feed";
import Widgets from "./pages/Widgets";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Feed />

      <Widgets />
    </div>
  );
}

export default App;
