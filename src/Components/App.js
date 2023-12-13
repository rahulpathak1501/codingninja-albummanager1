import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import UpdateAlbumForm from "./UpdateAlbumForm";

function App() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => setAlbums(json));
  }, []);

  const handleDelete = (e) => {
    //e.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/albums?id=${e}`, {
      method: "DELETE",
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`Failed to delete album with ID ${e}`);
        // }
        const newAlbums = albums.filter((album) => album.id !== e);
        setAlbums(newAlbums);
        console.log(`Album with ID ${e} deleted successfully`);
        return response.json();
      })
      .catch((error) => {
        console.error(error.message);
      });
    console.log(e);
  };

  const handleUpdate = (id, title) => {
    // e.preventDefault();

    // history.push(`/update-form/${id}`);
    navigate(`/update-form/${id}`);
  };

  return (
    <div className="container">
      <div className="showAlbum">
        <table>
          <tbody>
            <tr>
              <th>Albums</th>
            </tr>
            {albums.map((album) => (
              <tr key={album.id}>
                <td>{album.title}</td>
                <td>
                  <Link to={`/update-form/${album.id}`}>
                    <button
                      type="submit"
                      onClick={() => handleUpdate(album.id, album.title)}
                    >
                      Update
                    </button>
                  </Link>
                </td>
                <td>
                  <button type="submit" onClick={() => handleDelete(album.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
