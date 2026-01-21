import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { isMalayalam } = useLanguage();
  return (
    <div className="min-h-screen w-screen bg-black text-white flex items-center justify-center overflow-hidden p-5">
      <div className="text-center">
        <div className="text-4xl sm:text-6xl font-bold text-gray-400 mb-6 border-5 border-dashed px-3 py-15">
          404 {isMalayalam ? "(പേജ് ഒന്നും ഇവിടെയില്ല)" : "(Page not found)"}
        </div>
        <h1 className="text-xl sm:text-4xl font-semibold mb-4 my-10">
          {isMalayalam ? "ബ്രധർ, നിനക്ക് വഴിതെറ്റിയോ?" : "Sahodhara, are you lost?"}
        </h1>
        <p className="text-2xl text-gray-400 mb-8">
          {isMalayalam ? "നിങ്ങൾ അന്വേഷിക്കുന്ന പേജ് ഇവിടെ ഇല്ല." : "The page you're looking for does not exist."}
        </p>
        
        <div className="flex justify-center mb-10">
          <a 
            href="/" 
            className="text-gray-500 hover:text-gray-300 transition-colors duration-300 border border-dashed px-5 py-3"
            style={{ textDecoration: "none" }}
          >
            ← {isMalayalam ? "മടങ്ങിപ്പോവുക" : "Run back Home"}
          </a>
        </div>
      </div>
    </div>
  );
}