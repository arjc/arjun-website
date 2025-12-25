const Footer = () => (
  <footer className="absolute text-center p-15 mt-[485vh] bg-black bottom-0 w-screen text-white">
    <div className="flex flex-col items-center gap-1">
      <h1>arjunliji.me</h1>
      <div className="flex gap-4">
        <a href="#about">About</a>|<a href="#contact">Legal</a>|<a href="#privacy">Privacy</a>
      </div>
      <p>&copy; 2023-{new Date().getFullYear()} Arjun M Liji</p>
    </div>
  </footer>
);
export default Footer;
