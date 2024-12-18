import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="flex justify-center items-center mt-52">
        <div>
             <h2 className="text-5xl">404 ! Tmi to Haraiya geso :D</h2>
             <div className="flex justify-center">
                  <Link to={'/'}>
                       <button className="text-xl bg-teal-700 my-6 text-white py-2 px-5 rounded">Ami Basay jabo :(</button>
                  </Link>
             </div>
        </div>
    </section>
  )
}
