import React, { useEffect, useState } from "react";

const Download = () => {
  const [downloadLinks, setDownloadLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const headers = { 'Content-Type': 'application/json' }
      try {
        const response = await fetch(
          "http://104.196.23.184/api/task/3423b256-f5ea-470c-ade4-1914103828b9",
          {mode:'no-cors', method: 'GET'}
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          // Extract download links using regular expression
          const regex = /"(https:\/\/[^"]+)"/g;
          const matches = data.match(regex);
          // Set download links to state
          setDownloadLinks(matches || []);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Download Links:</h1>
      <ul>
        {downloadLinks.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default Download;