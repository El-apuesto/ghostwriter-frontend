import React from 'react';

const Statistics = () => {
  const stats = [
    {
      number: "50,000+",
      label: "Stories Generated",
      description: "Novels, novellas, and short stories created"
    },
    {
      number: "1,200+",
      label: "Published Authors",
      description: "Professional writers using our platform"
    },
    {
      number: "4.8/5",
      label: "User Rating",
      description: "Based on verified user reviews"
    },
    {
      number: "24/7",
      label: "AI Assistance",
      description: "Round-the-clock creative support"
    }
  ];

  return (
    <section className="statistics-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
