import { createContext, useContext, useState } from "react";

// named export (as opposed to default export)

export const UserContext = createContext([null, () => {}]);
// createContext takes default value for provider

// use context: hook to create common data that can be accessed throughout component hierarchy
// accepts context objet (value returned from createContext) and returns current context
// current context is value determined by value prop of nearest above calling component in tree
// hook triggers a rerender with the latest context value passed through

export const useUser = () => useContext(UserContext);
// useContext takes in context and returns current value of context

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
      <UserContext.Provider value={[user, setUser]}>
        {children}
      </UserContext.Provider>
    );
  };

