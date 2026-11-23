const galleryImages = [
  
  { src: '/images/IMG_9176.jpg', alt: 'Gallery image 4' },
  { src: '/images/IMG_9178.JPG', alt: 'Gallery image 5' },
  { src: '/images/IMG_9187.JPG', alt: 'Gallery image 6' },
  { src: '/images/IMG_9232.JPG', alt: 'Gallery image 7' },
  { src: '/images/IMG_9233.JPG', alt: 'Gallery image 8' },
  { src: '/images/IMG_9461.jpg', alt: 'Gallery image 9' }
];

function Portfolio() {
  return (
    <>
      <section className="hero" id="top">
        <img className="hero-image" src="/images/IMG_8875.jpg" alt="Gurudev" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-text">
          <p className="eyebrow">DEV@Deakin / Chitkara</p>
          <h1>Radhe Radhe , I &apos;m Sanchit Arora</h1>
          <p>Radhe Radhe Shree Kunj Biahri Shree Haridas.</p>
        </div>
      </section>

      <section className="about" id="about">
        <img className="profile" src="/images/IMG_8674.jpg" alt="Sanchit Arora" />
        <div>
          <p className="eyebrow">ABOUT ME</p>
          <h2>Sanchit Arora</h2>
          <p>
            My project, Mero Vrindavan, is a personal website that showcases my memorable experiences and photographs from Vrindavan and Barsana. It highlights beautiful temples, traditional architecture, rich cultural traditions and peaceful surroundings. Through this project, I aim to preserve my travel memories and share the beauty and cultural significance of these places with others. I also enjoy photography, exploring new places and learning about web development technologies.
          </p>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <p className="eyebrow">MEDIA</p>
        <h2>Gallery</h2>
        <div className="gallery">
          {galleryImages.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">GET IN TOUCH</p>
        <h2>Contact</h2>
        <p><a href="mailto:sanchit9085.ai25@chitkara.edu.in">sanchit9085.ai25@chitkara.edu.in</a></p>
      </section>
    </>
  );
}

export default Portfolio;
