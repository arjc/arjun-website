import { useLanguage } from "../context/LanguageContext";

const Action = () => {
  const { isMalayalam } = useLanguage();
  
  return (
    <div className="flex flex-col justify-center items-center text-center w-screen h-1/3 gap-10">
      <h1 className="w-[75vw]">
        {isMalayalam ? "അർജുൻ ലിജി - ഔദ്യോഗിക വെബ്സൈറ്റ്" : "Arjun Liji - Official Website"}
      </h1>
      <p className="w-[90vw]">
        {isMalayalam 
          ? "എന്റെ പേര് അർജുൻ എം ലിജി, ഞാൻ 18 വയസ്സായ എൻഎസ്എസ്സിഇ പാലക്കാടിൽ കമ്പ്യൂട്ടർ സയൻസ് ആൻഡ് ഇഞ്ജിനീയറിംഗിൽ ബാച്ചിലേഴ്സ് ഡിഗ്രി കോഴ്സ് ചെയ്യുന്നു. എന്റെ സൈറ്റിന് സന്ദർശനം നടത്തിയതിനും ഇവിടെ ഉണ്ടായതിനും നന്ദി, വെബ്സൈറ്റ് കൂടുതൽ മികച്ചതാക്കാൻ ഞാൻ പ്രയത്നിക്കുന്നതുവരെ നിങ്ങൾ വിശ്രമിക്കുക. നിങ്ങളുടെ ക്ഷമയ്ക്ക് നന്ദി..."
          : "My name is Arjun M Liji, I am 18 currently pursuing my Bachelor's in Computer Science and Engineering at NSSCE, Palakkad. Thank you for visiting my site and if you are here, just chill just relax while I build this website further. Thank you for ur patience..."}
      </p>
      <div className="flex flex-wrap justify-center gap-5">
        <a href="/cv.pdf" className="px-7 py-3 border-2 border-white rounded-2xl">
          {isMalayalam ? "സി.വി" : "Download CV"}
        </a>
        <a href="/" className="px-7 py-3 border-2 border-white rounded-2xl">
          {isMalayalam ? "ചിത്രങ്ങൾ" : "Gallery"}
        </a>
        <a href="/" className="px-7 py-3 border-3 border-white rounded-2xl">
          {isMalayalam ? "സന്വര്ക്കം" : "Contact"}
        </a>
      </div>
    </div>
  );
};
export default Action;
