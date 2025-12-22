const project = () => {
  return (
    <>
        <div className="project-section">
            <h1 className="text-5xl font-bold mb-4 text-white">Projects</h1>
            <div className="project-list">
                <div className="project-item"> 
                    <h2 className="text-3xl font-semibold mb-2 text-white">Project 1</h2>
                    <p className="text-white mb-6">Description of Project 1.</p>
                </div>
                <div className="project-item">
                    <h2 className="text-3xl font-semibold mb-2 text-white">Project 2</h2>
                    <p className="text-white mb-6">Description of Project 2.</p>
                </div>
                <div className="project-item">
                    <h2 className="text-3xl font-semibold mb-2 text-white">Project 3</h2>
                    <p className="text-white mb-6">Description of Project 3.</p>
                </div>
            </div>
        </div>
    </>
  );
}

export default project;