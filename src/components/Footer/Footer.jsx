import "./Footer.css";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="Footer">
      <div className="Footer__inner">
        <p className="Footer__copy">
          Página creada por Dario Asurey • {year} • 🏐
        </p>
      </div>
    </footer>
  );
};
