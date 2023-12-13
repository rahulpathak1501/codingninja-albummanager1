import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import UpdateAlbumForm from "./UpdateAlbumForm";

function RoutComponents() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/update-form/:id" element={<UpdateAlbumForm />} />
        </Routes>
      </Router>
    </>
  );
}
export default RoutComponents;
