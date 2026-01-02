const Footer = () => (
  <footer className="absolute text-center p-15 mt-[485vh] bg-black bottom-0 w-screen text-white">
    <div className="flex flex-col items-center gap-1">
      <h1>arjc.me</h1>
      <div className="flex gap-4 font-1">
        <a href="/about">About</a>|<a href="/legal">Legal</a>|<a href="/privacy">Privacy</a>
      </div>
      <div>&copy; 2023-{new Date().getFullYear()} Arjun M Liji
<!-- hitwebcounter Code START -->
<a href="https://www.hitwebcounter.com/" target="_blank">
<img src="https://hitwebcounter.com/counter/counter.php?page=21466985&style=0001&nbdigits=8&type=page&initCount=0" title="Free Tools" Alt="Free Tools"   border="0" /></a></div>
    </div>
  </footer>
);
export default Footer;
