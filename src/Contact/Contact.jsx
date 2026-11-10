import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-black text-white px-5 py-20">
      <div className="flex gap-5 flex-col sm:flex-row justify-evenly w-screen px-5 ">
        <div className="text-[1.5em] mx-10">
          <h1 className="font-des">
            {isMalayalam ? 'സന്വര്ക്കം' : 'SOCIAL LINKS'}
          </h1>
          <h1 className="font-dev">~~&gt;</h1>
        </div>
        <div className="text-des flex flex-col lg:flex-row items-center lg:gap-40 sm:py-10 text-[1.7em] sm:text-[1em]">
          {/* i am too lazy to use grid to i made it like this */}
          <div>
            <div className="max-w-4xl mx-auto py-10 px-5">
            {isMalayalam ? 'യൂട്യൂബ്:' : 'Youtube:'}
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
            <div className="max-w-4xl mx-auto py-10 px-5">
              {isMalayalam ? 'ഗിറ്റ്ഹബ്:' : 'Github:'}
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
            <div className="max-w-4xl mx-auto py-10 px-5">
              {isMalayalam ? 'ലിങ്ക്ഡ്ഇൻ:' : 'Linkedin:'}
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
          </div>
          <div>
            <div className="max-w-4xl mx-auto py-10 px-5">
              {isMalayalam ? 'ഇൻസ്റ്റാ:' : 'Insta:'}
              <ul>
                <li>
                  <a href="https://www.instagram.com/arjcig">
                    www.
                    <span style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', backgroundClip: 'text', color: 'transparent' }}>
                      instagram
                    </span>
                    .com/
                    <span className="text-white">arjc</span>ig
                  </a>
                </li>
              </ul>
            </div>
            <div className="max-w-4xl mx-auto py-10 px-5">
              {isMalayalam ? 'ഡിസ്കോർഡ്:' : 'Discord:'}
              <ul>
                <li>
                  <a href="https://discordapp.com/">
                    www.
                    <span className="text-[#7289da]">discord</span>
                    .com/
                    <span className="text-white">arjc</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="max-w-4xl mx-auto py-10 px-5">
              {isMalayalam ? 'ലീറ്റ്‌കോഡ്:' : 'LeetCode:'}
              <ul>
                <li>
                  <a href="https://leetcode.com/u/arjc/">
                    www.
                    <span className="text-[#FFA116]">leetcode</span>
                    .com/u/
                    <span className="text-white">arjc</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
