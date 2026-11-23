function ContentCard({ item }) {
  return (
    <article className="content-card">
      <img src={item.image} alt={item.title} />
      <div className="card-body">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="card-meta">
          <span>★ {item.rating}</span>
          <span>{item.author}</span>
        </div>
      </div>
    </article>
  );
}

export default ContentCard;
