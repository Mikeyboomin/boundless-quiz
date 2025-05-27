import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";

export default function Share() {
  const [params] = useSearchParams();
  const score = params.get("score");

  return (
    <>
      <Helmet>
        <title>You are now Berryfied! 🍓</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="I just got Berryfied!" />
        <meta
          name="twitter:description"
          content={`I scored ${score}/10 on the Boundless Proof of Thought quiz!`}
        />
        <meta
          name="twitter:image"
          content="https://boundless-quiz-blush.vercel.app/berryfied-badge.png"
        />
      </Helmet>

      <div className="text-center mt-16 px-4">
        <h1 className="text-3xl font-bold">You are now Berryfied! 🍓</h1>
        <p className="text-lg mt-2">Score: {score}/10</p>
        <img
          src="/berryfied-badge.png"
          alt="Berryfied Badge"
          className="mx-auto my-6 w-32"
        />
        <a
          href="/"
          className="inline-block bg-rose-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-rose-700"
        >
          Play Again
        </a>
      </div>
    </>
  );
}
