import photo1 from "/gallery/kakkoos.jpg";
import photo2 from "/gallery/kannadi.jpg";
import photo3 from "/gallery/mirror.jpg";

const Photogrid = () => {
  return (
    <div className="grid grid-cols-3 gap-4 object-cover w-screen h-[103vh] p-10 bg-black">
      {/* <img src={photo2} alt="kannadi" />
      <img src={photo1} alt="kakkoos" />
      <img src={photo3} alt="mirror" /> */}
    </div>
  );
};

export default Photogrid;
