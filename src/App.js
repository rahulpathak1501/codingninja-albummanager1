import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => setAlbums(json));
  }, []);

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
                  <button>Update</button>
                </td>
                <td>
                  <button>Delete</button>
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
