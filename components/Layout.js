import Head from "next/head";

export default function Layout(props) {
  return (
    <div className="container">
      <Head>
        <title>Ecommerce - {props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{props.children}</main>

      <style jsx>{`
        main {
          display: flex;
          background-color: "#FAFAFA";
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
