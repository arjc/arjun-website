const Footer = () => (
  <footer className="absolute text-center p-15 mt-[485vh] bg-black bottom-0 w-screen text-white">
    <div className="flex flex-col items-center gap-1">
      <h1>arjc.me</h1>
      <div className="flex gap-4">
        <a href="#about">About</a>|<a href="#contact">Legal</a>|<a href="#privacy">Privacy</a>
      </div>
      <div>&copy; 2023-{new Date().getFullYear()} Arjun M Liji</div>
    </div>
  </footer>
);
export default Footer;
