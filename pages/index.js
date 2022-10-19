import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Index() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/albums")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="album-list">
        {items.map(item => (
          <Link href={{
            pathname: `/album/${item.id}`
          }} key={item.id}>
            <div className="album-item">
              <img src={item.cover_art_url}/>
              {item.artist}<br/>{item.title}
            </div>
          </Link>
        ))}
      </div>
    );
  }
}