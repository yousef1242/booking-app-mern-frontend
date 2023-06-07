import "./modelDescriptionHotel.css";

const ModelDescriptionHotel = ({ description, setModelOpen }) => {
  return (
    <>
      <div className="model-description">
        <div className="div-icon">
          <i onClick={() => setModelOpen(false)} class="bi bi-x-lg"></i>
        </div>
        <div className="overflow-scroll">
          <h2>About this hotel</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default ModelDescriptionHotel;
