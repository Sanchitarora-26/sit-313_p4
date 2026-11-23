import ContentCard from './ContentCard';

function ContentSection({ id, title, items, buttonText }) {
  return (
    <section className="content-section" id={id}>
      <p className="eyebrow">DEV@DEAKIN / CHITKARA</p>
      <h2>{title}</h2>
      <div className="card-grid">
        {items.map((item) => (
          <ContentCard key={item.title} item={item} />
        ))}
      </div>
      {buttonText && (
        <button className="section-btn" type="button">{buttonText}</button>
      )}
    </section>
  );
}

export default ContentSection;
