import React, { useEffect, useState } from "react";

interface Task {
  _id: string;
  name: string;
  description: string | null;
  email: string;
  title: string;
  date: string;
  time: string;
  notes: string;
}

interface BrowserTaskProps {
  apiUrl: string;
}

const BrowserTask: React.FC<BrowserTaskProps> = ({ apiUrl }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [apiUrl]);

  const filteredTasks = tasks.filter((task) =>
    (task.title ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="" style={styles.container}>
      <h1 style={styles.header}>Task Browser</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      {loading && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2rem 0" }}>
          <div style={{
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #0070f3",
            borderRadius: "50%",
            width: 40,
            height: 40,
            animation: "spin 1s linear infinite"
          }} />
          <p style={{ marginTop: 16 }}>Loading tasks...</p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
              }
            `}
          </style>
        </div>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && filteredTasks.length === 0 && (
        <p>No tasks found for "{searchTerm}"</p>
      )}

      <div style={styles.cardGrid}>
        {filteredTasks.map((task) => (
          <div  key={task._id} style={styles.card}>
            <h2 style={styles.cardTitle}>{task.title}</h2>
            <p><strong>Name:</strong> {task.name}</p>
            <p><strong>Email:</strong> {task.email}</p>
            {task.description && <p><strong>Description:</strong> {task.description}</p>}
            <p><strong>Date:</strong> {task.date}</p>
            <p><strong>Time:</strong> {task.time}</p>
            {task.notes && <p><strong>Notes:</strong> {task.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 960,
    margin: "8rem auto",
    padding: "0 1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  searchInput: {
    display: "block",
    width: "100%",
    maxWidth: 400,
    padding: "0.5rem 1rem",
    margin: "0 auto 2rem",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
    cursor: "default",
    
  },
  cardTitle: {
    margin: "0 0 1rem",
    color: "#0070f3",
    fontWeight: 700,
    fontSize: "1.25rem",
  },
};

export default BrowserTask;
