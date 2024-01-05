import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import UpdateAlbumForm from "./UpdateAlbumForm";
import AddAlbum from "./AddAlbum";

function RoutComponents() {
  return (
    <>
      <Router basename="/codingninja-albummanager1/">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/update-form/:id" element={<UpdateAlbumForm />} />
          <Route path="/add-album" element={<AddAlbum />} />
        </Routes>
      </Router>
    </>
  );
}
export default RoutComponents;
