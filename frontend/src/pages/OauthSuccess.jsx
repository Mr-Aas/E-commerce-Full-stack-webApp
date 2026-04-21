import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      login(token); // ✅ IMPORTANT
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;