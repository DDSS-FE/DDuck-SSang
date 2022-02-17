import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = () => {
  const onSuccess = (response: unknown) => {
    console.log(response);
  };

  const onFailure = (error: unknown) => {
    console.error(error);
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      buttonText="구글로 로그인"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
