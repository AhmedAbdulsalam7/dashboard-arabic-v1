"use client";

import React, { useEffect, useState } from 'react';

export default function Page() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        setArticles(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    // <div>
    //   <h1>Article Page</h1>
    //   {articles.length === 0 ? (
    //     <p>No articles found.</p>
    //   ) : (
    //     <ul>
    //       {articles.map((article) => (
    //         <li key={article.id}>
    //           <h2>{article.title}</h2>
    //           <p>{article.content}</p>
    //           <p>Author: {article.author?.name}</p>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <div className="container mt-5">
      <h1 className="mb-4">Article Page</h1>
      <div className="row">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((article) => (
            <div className="col-md-6 mb-4" key={article.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.content}</p>
                  <p className="card-text"><small className="text-muted">Author: {article.author?.name}</small></p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}