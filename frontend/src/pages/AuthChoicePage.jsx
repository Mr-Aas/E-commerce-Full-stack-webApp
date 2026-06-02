import { useNavigate } from "react-router-dom";

const AuthChoice = () => {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleFacebook = () => {
    window.location.href = `${API_URL}/auth/facebook`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6efe6] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-yellow-200">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-teal-400 flex items-center justify-center text-white font-bold">
            SG
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-brown-800">
          Welcome to SmartGrahak.in
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Make Your Shopping Experience Unforgettable
        </p>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="w-full border border-yellow-400 rounded-lg py-3 mb-3 flex items-center justify-center gap-2 hover:bg-yellow-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="30" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg> Continue with Google
        </button>

        {/* Facebook */}
        <button
          onClick={handleFacebook}
          className="w-full border border-yellow-400 rounded-lg py-3 mb-4 flex items-center justify-center gap-2 hover:bg-yellow-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="30" viewBox="0 0 48 48">
<path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
</svg> Continue with Facebook
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">
            or continue with email
          </span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Email Login */}
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600"
        >
          Sign in with Email
        </button>

        {/* Signup */}
        <button
          onClick={() => navigate("/signup")}
          className="w-full mt-3 border border-yellow-400 py-3 rounded-lg hover:bg-yellow-50"
        >
          Create new account
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-5">
          By signing in, you accept our Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default AuthChoice;