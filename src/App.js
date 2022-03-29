import "./App.css";
import {useState} from 'react'
import AllContacts from "./contacts.json"

function App() {
  const firstFive = AllContacts.slice(15,20);
  const [celebs, setCelebs] = useState(firstFive);

  const addRandom= () => {
    const randomIndex = Math.floor(Math.random()* AllContacts.length);
    setCelebs([AllContacts[randomIndex], ...celebs]);
    // Array.from(new Set(setCelebs([AllContacts[randomIndex], ...celebs])));
  }

  const sortItems =() =>{
    const deepCopy = JSON.parse(JSON.stringify(celebs));
    deepCopy.sort((a,b) => {
      if(a.name> b.name){
        return 1;
      } else {
        return -1;
      }
    })
    setCelebs(deepCopy)
  }
  const sortItemsByPopu =() =>{
    const deepCopy = JSON.parse(JSON.stringify(celebs));
    deepCopy.sort((a,b) => {
      if(a.popularity< b.popularity ){
        return 1;
      } else {
        return -1;
      }
    })
    setCelebs(deepCopy)
  }

  const deleteContact = (characterToFind) => {
    setCelebs((item) => {
      return item.filter(
        (element) => element.id !== characterToFind.id
      );
    });
  };

  return <div className="App">
    <h1>Iron Contacts</h1>
    <button onClick={addRandom}>Add new Random Contact</button>
    <button onClick={sortItems}>sort by Alphabets Contact</button>
    <button onClick={sortItemsByPopu}>sort by popu Contact</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>WonOscar</th>
          <th>WonEmmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {celebs.map((elem, index) =>{
          return(
            <tr key={elem.name + index}>
            <td>
              <img src={elem.pictureUrl}
              alt="celeb pic"
              style={{height: "90px"}}
              />
            </td>
            <td>
              <h3>{elem.name}</h3>
            </td>
            <td>
              <h3>{elem.popularity}</h3>
            </td>
            <td>{elem.wonOscar ? <h3>🏆</h3> : null} </td>
            <td>
              <h3>{elem.wonEmmy ? "🏆" :null} </h3>
            </td>
            <td><button onClick={()=> {
              deleteContact(elem)
            }}>delete Contact</button> </td>
            </tr>
          )
        }
        )}
      </tbody>
    </table>
  </div>;
}
export default App;