import { FC, ReactNode, createContext, useContext } from "react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

const AuthContext = createContext<{
  user: User | null;
  userDocData: DocumentData | null;
  error: any;
}>({
  user: null,
  userDocData: null,
  error: null
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, userDocData, error } = useAuthContext();

  return (
    <AuthContext.Provider
      value={{
        user,
        userDocData,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
