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
      <div className="text-des flex flex-col sm:flex-row items-center justify-evenly gap-10 w-screen py-15">
        <div>
          <div className="max-w-4xl mx-auto text-center py-10 px-5">
            Youtube:
            <ul>
              <li>
                <a href="https://www.youtube.com/@arjcyt">
                  www.
                  <span className="text-[#ff0000]">youtube</span>
                  .com/@
                  <span className="text-white">arjc</span>yt
                </a>
              </li>
            </ul>
          </div>
          <div className="max-w-4xl mx-auto text-center py-10 px-5">
            Github:
            <ul>
              <li>
                <a href="https://www.github.com/arjc">
                  www.
                  <span className="text-[#fafbfc]">github</span>
                  .com/
                  <span className="text-white">arjc</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="max-w-4xl mx-auto text-center py-10 px-5">
            Linkedin:
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/arjc">
                  www.
                  <span className="text-[#0a66c2]">linkedin</span>
                  .com/in/
                  <span className="text-white">arjc</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="max-w-4xl mx-auto text-center py-10 px-5">
            Email:
            <ul>
              <li><a href="mailto:support@arjc.me">arjun@<span className="text-white">arjc.me</span></a></li>
            </ul>
          </div>
        </div>
        <div>
                  <div className="max-w-4xl mx-auto text-center py-10 px-5">
          Youtube:
          <ul>
            <li>
              <a href="https://www.youtube.com/@arjcyt">
                www.
                <span className="text-[#ff0000]">youtube</span>
                .com/@
                <span className="text-white">arjc</span>yt
              </a>
            </li>
          </ul>
        </div>
        <div className="max-w-4xl mx-auto text-center py-10 px-5">
          Github:
          <ul>
            <li>
              <a href="https://www.github.com/arjc">
                www.
                <span className="text-[#fafbfc]">github</span>
                .com/
                <span className="text-white">arjc</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="max-w-4xl mx-auto text-center py-10 px-5">
          Linkedin:
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/arjc">
                www.
                <span className="text-[#0a66c2]">linkedin</span>
                .com/in/
                <span className="text-white">arjc</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="max-w-4xl mx-auto text-center py-10 px-5">
          Email:
          <ul>
            <li><a href="mailto:support@arjc.me">arjun@<span className="text-white">arjc.me</span></a></li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
