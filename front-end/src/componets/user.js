// Import necessary React components and libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component for displaying a specific entry by ID
const SpecificEntry = () => {
  const [id, setId] = useState('');
  const [entry, setEntry] = useState('');

  const fetchSpecificEntry = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/string/${id}`);
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
          <p>String: {entry.string}</p>
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
        const response = await axios.get('http://localhost:3000/strings');
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
              <td>{entry.string}</td>
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
  const [newString, setNewString] = useState('');

  const updateEntry = async () => {
    try {
      await axios.put(`http://localhost:3000/string/${id}`, { string: newString });
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
        value={newString}
        onChange={(e) => setNewString(e.target.value)}
      />
      <button onClick={updateEntry}>Update Entry</button>
    </div>
  );
};

// Component for deleting entries
const DeleteEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchAllEntries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/strings');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching all entries:', error);
      }
    };

    fetchAllEntries();
  }, []);

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/string/${id}`);
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
              <td>{entry.string}</td>
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

// Main App Component
const App = () => {
  return (
    <div>
      <SpecificEntry />
      <AllEntries />
      <UpdateEntry />
      <DeleteEntries />
    </div>
  );
};

export default App;
