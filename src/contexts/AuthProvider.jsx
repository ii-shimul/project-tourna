import AuthContext from "./AuthContext.jsx";

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const authInfo = {
    user
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
