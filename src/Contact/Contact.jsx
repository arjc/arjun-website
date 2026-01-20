import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-black text-white px-5 py-20">
      <div className="w-screen bg-white overflow-hidden">
        <span
          className="inline-block font-extrabold text-black px-1 py-3 text-6xl sm:text-8xl leading-normal whitespace-nowrap animate-marquee font-des"
          style={{
            animation: "marquee 16s ease-in-out infinite alternate",
          }}
        >
          {isMalayalam ? (
            <>
              <span>സന്വര്ക്കം ~ </span>
              <span>സന്വര്ക്കം ~ </span>
              <span>സന്വര്ക്കം ~ </span>
              <span>സന്വര്ക്കം ~ </span>
              <span>സന്വര്ക്കം ~ </span>
              <span>സന്വര്ക്കം ~ </span>
              <span>സന്വര്ക്കം ~ </span>
              <span>സന്വര്ക്കം ~ </span>
              <span>സന്വര്ക്കം ~ </span>
              <span>സന്വര്ക്കം</span>
            </>
          ) : (
            <>
              <span>Contact ~ </span>
              <span>Call ~ </span>
              <span>Reachout ~ </span>
              <span>Collab ~ </span>
              <span>Get in TOUCH ~ </span>
              <span>Commission ~ </span>
              <span>Talk ~ </span>
              <span>Hang Out ~ </span>
              <span>Meet ~ </span>
              <span>Greet ~ </span>
              <span>Contact</span>
            </>
          )}
        </span>
      </div>
      <div className="text-[#111] text-des">

        <div className="max-w-4xl mx-auto text-center py-10 px-5">
          Linkedin:
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/arjc">
                www.
                <span className="text-blue-300">linkedin</span>
                .com/in/
                <span className="text-white">arjc</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="max-w-4xl mx-auto text-center py-10 px-5">
          Email:
          <ul>
            <li><a href="mailto:support@arjc.me">support@<span className="text-white">arjc.me</span></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
