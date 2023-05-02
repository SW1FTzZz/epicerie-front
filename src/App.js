import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [item, setItem] = useState('');
  const [liste, setListe] = useState([]);
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [animation, setAnimation] = useState('');


  const getListe = async () => {
    try {
      const response = await axios.get('http://localhost:3001/liste_epicerie');
      setListe(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste');
    }
  };

  const ajouterItem = async () => {
    try {
      if (item !== "") {
        await axios.post("http://localhost:3001/liste_epicerie", { item });
        setConfirmation("Item ajouté");
        setItem("");
        getListe();
        setAnimation("added"); 
        setTimeout(() => {
          setConfirmation("");
          setAnimation(""); 
        }, 3000);
      } else {
        setError("Veuillez entrer un item");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un item");
    }
  };
  
  

  const supprimerItem = async (itemIndex) => {
    try {
      await axios.delete(`http://localhost:3001/liste_epicerie/${itemIndex}`);
      setConfirmation("Item supprimé");
      getListe();
      setAnimation("removed"); 
      setTimeout(() => {
        setConfirmation("");
        setAnimation(""); 
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la suppression d'un item");
    }
  };
  
  

  useEffect(() => {
    getListe();
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Liste d'épicerie</h1>
      </nav>
      <div className="parallax"></div>
      <div className="content">
        {error && <div className="error">{error}</div>}
        {confirmation && <div className="confirmation">{confirmation}</div>}
        <div className="input-container">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Nouvel item"
          />
          <button onClick={ajouterItem}>Ajouter</button>
        </div>
        <ul className="grocery-list">
          {liste.map(({ item, links }, index) => (
            <li key={index} className={`grocery-list-item ${animation}`}>
              {item}
              <button onClick={() => supprimerItem(index)}>Supprimer</button>
            </li>
          ))}
      </ul>
      </div>
    </div>
  );
}

export default App;

