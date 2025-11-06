import "./Main.css"

const Main = () => {
    return(
        <main>
            <p className="mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid beatae, ea ut illo explicabo unde quo nihil eos neque! Deleniti nulla saepe animi cupiditate, ut quis cum beatae earum ad.</p>

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
        </main>
    )
}
export default Main