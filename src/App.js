import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [projRepository, setProjRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((res) => {
      setProjRepository(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post("/repositories", {
      title: "Rocketseat - Challenge React.js",
      url: "https://github.com/lrdplopes/reactjs-challenge1",
      techs: ["Node.js", "React.js"],
    });

    const projData = res.data;
    setProjRepository([...projRepository, projData]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setProjRepository(projRepository.filter((project) => project.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projRepository.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
