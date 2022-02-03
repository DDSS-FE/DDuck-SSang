import type { NextPage } from 'next';
import GoogleLoginButton from '../components/GoogleLogin/GoogleLogin';
import Loading from '../components/Loading/Loading';

const Home: NextPage = () => {
  return (
    // <Loading />
    <GoogleLoginButton />
  );
};

export default Home;
