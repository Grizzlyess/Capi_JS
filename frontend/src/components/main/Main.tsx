import "./Main.css";

const Main = () => {
  return (
    <div className="d-flex flex-column flex-fill main">
      <div className="msg d-flex justify-content-center align-items-center">
        <p>O que fazemos com o planeta hoje determinará o nosso amanhã.</p>
      </div>

      <div className="container text-center mb-3">
        <div className="row">
          <div className="col p-1">
            <section className="ratio ratio-1x1">
              <img className="rounded" src="src/assets/img1.jpg" alt="" />
            </section>
          </div>
          <div className="col p-1">
            <section className="ratio ratio-1x1">
              <img className="rounded" src="src/assets/img2.jpg" alt="" />
            </section>
          </div>
          <div className="col p-1">
            <section className="ratio ratio-1x1">
              <img className="rounded" src="src/assets/img3.jpg" alt="" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
