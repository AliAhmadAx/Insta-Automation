import { useNavigate } from "react-router-dom";
import { SiFastly } from "react-icons/si";
import { FiTarget } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";

function TopServices() {
  let navigate = useNavigate();
  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Our Top Services</h2>

          <p className="mt-4 text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae aperiam
            fugit consequuntur saepe laborum.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <a
            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            href="/services/digital-campaigns"
          >
            <span className="text-pink-600 text-4xl">
              <SiFastly />
            </span>

            <h2 className="mt-4 text-xl font-bold text-white">Fast</h2>

            <p className="mt-1 text-sm text-gray-300">
              Searches literally take seconds to complete before you can
              download the results.
            </p>
          </a>

          <a
            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            href="/services/digital-campaigns"
          >
            <span className="text-pink-600 text-4xl">
              <FiTarget />
            </span>

            <h2 className="mt-4 text-xl font-bold text-white">Targetted</h2>

            <p className="mt-1 text-sm text-gray-300">
              You are in control of who you target whether that be bars,
              restaurants or dentists etc, Street View Spectator provides you
              with the targeted results.
            </p>
          </a>

          <a
            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            href="/services/digital-campaigns"
          >
            <span className="text-pink-600 text-4xl">
              <AiFillCheckCircle />
            </span>

            <h2 className="mt-4 text-xl font-bold text-white">Accurate</h2>

            <p className="mt-1 text-sm text-gray-300">
              Our results are incredibly accurate and speak for themselves. If
              you do happen to find an error, please let us know so that we can
              improve our algorithm.
            </p>
          </a>
        </div>

        <div className="mt-12 text-center">
          <a className="mt-8 inline-flex items-center rounded btn-hover hover:text-white bg-white px-8 py-3 text-black hover:bg-transparent focus:outline-none focus:ring">
            <button
              onClick={() => {
                navigate("/pricing");
              }}
              className="text-sm font-medium"
            >
              {" "}
              Get Started{" "}
            </button>

            <svg
              className="ml-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default TopServices;
