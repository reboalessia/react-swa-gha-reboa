import { useMemo, useState } from "react";
import "./App.css";
import { events, type EventItem } from "./data/events";
import { useLocalStorage } from "./hooks/useLocalStorage";

type FavoritesMap = Record<string, boolean>;

export default function App() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useLocalStorage<FavoritesMap>("favorites", {});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter(e =>
      [e.title, e.tag, e.location, e.date].some(x => x.toLowerCase().includes(q))
    );
  }, [query]);

  const favCount = useMemo(
    () => Object.values(favorites).filter(Boolean).length,
    [favorites]
  );

  function toggleFav(id: string) {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Mini Event Board</h1>
        <p className="subtitle">
          React + Vite + TypeScript → Deploy su Azure Static Web Apps
        </p>

        <div className="toolbar">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca per titolo, tag, data…"
            className="search"
          />
          <div className="badge">⭐ Preferiti: {favCount}</div>
        </div>
      </header>

      <main className="grid">
        {filtered.map((e) => (
          <EventCard
            key={e.id}
            item={e}
            isFav={!!favorites[e.id]}
            onToggle={() => toggleFav(e.id)}
          />
        ))}
      </main>

      <footer className="footer">
        <small>Tip: apri una PR e guarda l’ambiente di preview creato da Azure SWA 👀</small>
      </footer>
    </div>
  );
}

function EventCard({
  item,
  isFav,
  onToggle,
}: {
  item: EventItem;
  isFav: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="card">
      <div className="cardTop">
        <h2>{item.title}</h2>
        <button className={isFav ? "fav active" : "fav"} onClick={onToggle} aria-label="toggle favorite">
          {isFav ? "★" : "☆"}
        </button>
      </div>

      <div className="meta">
        <span className="pill">{item.tag}</span>
        <span className="pill">{item.location}</span>
        <span className="pill">{item.date}</span>
      </div>
    </article>
  );
}