import project from "../../public/data/project.js";

const Project = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen py-10 gap-20">
        <h1 className="text-5xl font-bold mb-4 text-white">Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[80vw]">
          {project.map((proj) => (
            <a
              key={Object.keys(proj)[0]}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item hover:opacity-80 transition-opacity"
            >
              <img
                src={proj.img}
                alt={Object.values(proj)[1] || "Project"}
                className="border-2 rounded-xl h-64 w-full object-cover"
              />
              <h2 className="text-3xl font-semibold mb-2 text-white">
                {Object.values(proj)[0]} <span className="text-xl">({proj.year})</span>
              </h2>
              <p className="text-gray-300 mb-6">{proj.description}</p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Project;
