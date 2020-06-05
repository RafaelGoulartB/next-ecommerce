import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Home">
      <div>
        <h1>Home with Layout</h1>
        <style jsx>{''}</style>
      </div>
    </Layout>
  );
}
