import "../styles/components/Main.css"
import img1 from "@/assets/img1.jpg"
import img2 from "@/assets/img2.jpg"
import img3 from "@/assets/img3.jpg"

const Main = () => {  
  return (
    <div className="d-flex flex-column">
      <div className="msg d-flex justify-content-center align-items-center mb-5">
        <p style={{fontSize:"1.5rem"}}>
          O que fazemos com o planeta hoje determinará o nosso amanhã.
        </p>
      </div>

      <div className="container text-center mb-3">
        <div className="row">
          <div className="col p-1">
            <section className="ratio ratio-1x1">
              <img className="rounded" src={img1} alt="" />
            </section>
          </div>
          <div className="col p-1">
            <section className="ratio ratio-1x1">
              <img className="rounded" src={img2} alt="" />
            </section>
          </div>
          <div className="col p-1">
            <section className="ratio ratio-1x1">
              <img className="rounded" src={img3} alt="" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
