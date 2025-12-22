const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="absolute text-center justify-center p-15 mt-[485vh] bg-black bottom-0 w-screen text-white">
      <div className="items-center flex flex-col gap-1">
        <h1>arjunliji.me</h1>
        <div className="gap-4 flex">
          <a href="#about">About</a>|
          <a href="#contact">Legal</a>|
          <a href="#privacy">Privacy Policy</a>
        </div>
        <p>&copy; 2023-{currentYear} Arjun M Liji All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
