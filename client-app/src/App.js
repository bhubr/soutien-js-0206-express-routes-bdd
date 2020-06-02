import React, { useState, useEffect } from 'react';

function App() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch('/api/links')
      .then(res => res.json())
      .then(data => setLinks(data));
  }, []);

  return (
    <div>
      <ul>
        {
          links.map((link) => (
            <li key={link.id}>
              <a href={link.url}>{link.title}</a>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
