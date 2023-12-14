import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => setAlbums(json));
  }, []);

  const handleDelete = async (e) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${e}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        console.log("Successfully deleted" + albums[e].title);
      }
    } catch (error) {
      console.log(error);
    }

    /*as we don't get direct deleted data we are updating the existed state here*/
    const newAlbums = albums.filter((album) => album.id !== e);
    setAlbums(newAlbums);
  };

  const handleUpdate = (id) => {
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
                      onClick={() => handleUpdate(album.id)}
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
        <Link to="/add-album">
          <button>Add A New Album</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
