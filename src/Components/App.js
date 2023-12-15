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
          mode: "cors",
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
    <>
      <div className="container">
        <div className="showAlbum">
          <table className="albumTable">
            <thead>
              <tr>
                <th>Albums</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album) => (
                <tr key={album.id}>
                  <td>{album.title}</td>
                  <td>
                    <Link to={`/update-form/${album.id}`}>
                      <button
                        className="updateButton"
                        type="submit"
                        onClick={() => handleUpdate(album.id)}
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="deleteButton"
                      type="submit"
                      onClick={() => handleDelete(album.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/add-album">
          <button className="addAlbumButton">Add A New Album</button>
        </Link>
      </div>
    </>
  );
}

export default App;
