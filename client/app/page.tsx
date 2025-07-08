import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      // If using the proxy, the URL is relative.
      // If using CORS, you would use the full URL: 'http://localhost:5000/api/data'
      const res = await fetch('/api/data');
      const result = await res.json();
      setData(result.message);
    }

    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return <p>{data}</p>;
}