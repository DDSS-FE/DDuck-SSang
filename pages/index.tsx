import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../styles/Home.module.scss';
import Navbar from '../components/Navbar/Navbar';
import Market from '../components/Market/Market';

const Home: NextPage = () => {
  return (
    <div>
      <div>DDuck SSang</div>
      <Market />
      <Navbar />
    </div>
  );
};

export default Home;
