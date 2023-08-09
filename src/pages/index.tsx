import Link from "next/link";

const Home = () => {
  return (
    <main className={mainStyle}>
      <h1>Vacant Sea</h1>
      <p>
        <i>There's always plenty more jobs in the sea</i>
      </p>
      <Link href="/listings">
        <button className={buttonStyle}>Explore</button>
      </Link>
    </main>
  );
};

const mainStyle = "flex flex-col items-center justify-center min-h-screen p-4";

const buttonStyle = "bg-blue-500 text-white p-2 rounded m-4";

export default Home;
