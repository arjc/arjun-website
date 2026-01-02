const Footer = () => (
  <footer className="absolute text-center p-15 mt-[485vh] bg-black bottom-0 w-screen text-white">
    <div className="flex flex-col items-center gap-1">
      <h1>arjc.me</h1>
      <div className="flex gap-4 font-1">
        <a href="/about">About</a> <a href="/legal">Legal</a> <a href="/privacy">Privacy</a>
      </div>
      <div>&copy; 2023-{new Date().getFullYear()} Arjun M Liji </div>
<div className="flex flex-row items-center justify-center gap-2">
You are among
<img src="https://hitwebcounter.com/counter/counter.php?page=21466989&style=0024&nbdigits=8&type=ip&initCount=0" border="0" />
visitors who visited my site...
</div>
    </div>
  </footer>
);
export default Footer;
