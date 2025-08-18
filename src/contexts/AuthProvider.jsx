import AuthContext from "./AuthContext.jsx";

const AuthProvider = ({ children }) => {
  const authInfo = {
    hi: "context",
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
