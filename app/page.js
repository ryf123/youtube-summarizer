'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';
import { useClient } from 'next/client'; // Import the useClient pragma

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Replace with your API endpoint
    const apiUrl = `https://youtube-summarizer-taupe.vercel.app/api/summarize?url=${inputText}`;

    try {
      const response = await fetch(apiUrl);
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div>
          <input 
            type="text" 
            value={inputText} 
            onChange={handleInputChange} 
            placeholder="Enter text..."
          />
          <button onClick={handleSubmit}>Submit</button>

          {loading && <p>Loading...</p>}

          {data && (
            <div>
              {/* Display your data here. This is just an example. */}
              <p>{data}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}