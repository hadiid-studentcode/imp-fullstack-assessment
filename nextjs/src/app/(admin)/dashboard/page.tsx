import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold">Hello world!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link href="/posts" className="btn btn-primary">
              New Post
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
