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
      clientId="483759143675-o3btt4t0qdqbsdhgspioki92kahhld4k.apps.googleusercontent.com"
      buttonText="구글로 로그인"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
