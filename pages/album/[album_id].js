import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';

export default function Album() {
  const router = useRouter()
  const { album_id } = router.query
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/albums/${album_id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result);
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
      <div className="album-display">
        <img src={item.cover_art_url}/>
        <h1>{item.title}</h1>
        por {item.artist}
        <br/>
        <b>Gravadora:</b> {item.label} <br/>
        <b>Lançado em:</b> {item.release_date}
      </div>
    );
  }
}