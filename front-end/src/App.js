// import './App.css';
// import Nav from './componets/Nav';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from './componets/user';

// function App() {
//   return (
//     <div className="App">
//       {/* <h1>E-Dashboard</h1> */}
//       <BrowserRouter>
//       <Nav />
//       <Routes>
//         <Route >
//         <Route path='/' element={<h1>  User</h1>} />
//         <Route path='/add' element={<h1> add User</h1>} />
//         <Route path='/update/:id' element={<h1> update User</h1>} />
//         <Route path='/logout' element={<h1> Logout User</h1>} />
//         <Route path='/profile' element={<h1> User Profile</h1>} />
//         </Route>
        
//         <Route path='/Signup' element={<h1> Logout User</h1>} />
//         <Route path='/login' element={<h1> Logout User</h1>} />
//       </Routes>
        
//       </BrowserRouter>
    
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component for displaying a specific entry by ID
const SpecificEntry = () => {
  const [id, setId] = useState('');
  const [entry, setEntry] = useState([]);
  console.warn(entry.id);
  console.warn(entry.names);

  const fetchSpecificEntry = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/string/${id}`,{
        method:'get',
        headers: {
            "content-Type":"application/json",
        }
    });
    console.warn(response);
      console.log(response);
      setEntry(response.data);
    } catch (error) {
      console.error('Error fetching specific entry:', error);
    }
  };

  return (
    <div>
      <h2>Show Specific Entry</h2>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={fetchSpecificEntry}>Show Entry</button>
      {entry && (
        <div>
          <p>ID: {entry.id}</p>
          <p>String: {entry.names}</p>
        </div>
      )}
    </div>
  );
};

// Component for displaying all entries in a table
const AllEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchAllEntries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/strings');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching all entries:', error);
      }
    };

    fetchAllEntries();
  }, []);

  return (
    <div>
      <h2>Show All Entries</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>String</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.names}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Component for updating an entry
const UpdateEntry = () => {
  const [id, setId] = useState('');
  const [newName, setNewString] = useState('');
  console.warn(newName);

  const updateEntry = async () => {
    try {
      await axios.put(`http://localhost:5000/string/${id}`, { string: newName });
      alert('Entry updated successfully!');
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  return (
    <div>
      <h2>Update Entry</h2>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter New String"
        value={newName}
        onChange={(e) => setNewString(e.target.value)}
      />
      <button onClick={updateEntry}>Update Entry</button>
    </div>
  );
};

// Component for deleting entries
const DeleteEntries = () => {
    const [entries, setEntries] = useState([]);
  
    // Define fetchAllEntries here
    const fetchAllEntries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/strings');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching all entries:', error);
      }
    };
  
    useEffect(() => {
      // Call fetchAllEntries on component mount
      fetchAllEntries();
    }, []);
  
    const deleteEntry = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/string/${id}`);
        alert('Entry deleted successfully!');
        // Fetch updated entries after deletion
        fetchAllEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    };

  return (
    <div>
      <h2>Delete Entries</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>String</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.names}</td>
              <td>
                <button onClick={() => deleteEntry(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddName = () => {
  const [newName, setNewName] = React.useState('');
  console.warn(setNewName);

  const addName = async () => {
    try {
      await axios.post('http://localhost:5000/string', { string: newName });
      alert('Name added successfully!');

      setNewName('');
    } catch (error) {
      console.error('Error adding name:', error);
    }
  };

  return (
    <div>
      <h2>Add Name</h2>
      <input
        type="text"
        placeholder="Enter Name"
        value={newName}

        onChange={(e) => setNewName(e.target.value)}
      />
      
      <button onClick={addName}>Add Name</button>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div>
      <SpecificEntry />
      <AllEntries />
      <UpdateEntry />
      <DeleteEntries />
      <AddName />
    </div>
  );
};

export default App;
