import spidey from "../assets/spiderman.webp";
import "./About.css";

const about = () => {
  const age = new Date().getFullYear() - 2007;

  const skillsData = [
    {
      category: "Primary domains",
      skills: ["Python", "AI/ML [Pending]", "Tensorflow", "C++"],
      classMap: {
        Python: "skill-python",
        JavaScript: "skill-javascript",
        "C++": "skill-cpp",
        Java: "skill-java",
        Tensorflow: "skill-tensorflow",
        "AI/ML [Pending]": "skill-aiml",
      },
    },
    {
      category: "Web Development",
      skills: ["HTML", "CSS", "TypeScript/Js", "React", "Node.js", "Express"],
      classMap: {
        HTML: "skill-html",
        CSS: "skill-css",
        "TypeScript/Js": "skill-javascript",
        React: "skill-react",
        "Node.js": "skill-nodejs",
        Express: "skill-express",
      },
    },
    {
      category: "Databases",
      skills: ["MySQL", "MongoDB"],
      classMap: {
        MySQL: "skill-mysql",
        MongoDB: "skill-mongodb",
      },
    },
    {
      category: "Tools",
      skills: ["Git", "Docker", "Figma", "AWS", "Flask"],
      classMap: {
        Git: "skill-git",
        Docker: "skill-docker",
        Figma: "skill-figma",
        AWS: "skill-aws",
        Flask: "skill-flask",
      },
    },
  ];

  return (
    <div className="about-container">
      <div className="about-image">
        <img src={spidey} alt="Arjun M Liji dressed as peter parker" />
      </div>

      <div className="about-content">
        <div className="about-header">
          <h1>
            Arjun M Liji <span style={{ color: "#808080", fontSize: "1.3em" }}>({age})</span>
          </h1>
        </div>

        <p className="about-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ut ex
          exercitationem fuga rerum ab mollitia quaerat eligendi quas beatae, at
          magni! Est animi illum eligendi iste quo repellat perspiciatis.
        </p>

        <div className="skills-section flex-col lg:flex-row">
          {skillsData.map((category, index) => (
            <div key={index} className="skills-category">
              <div className="skills-category-title">{category.category}</div>
              <div className="skills-list">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`skill-badge ${category.classMap[skill]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default about;
