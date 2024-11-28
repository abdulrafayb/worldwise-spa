import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'logout':
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error('Unknown action');
  }
}

const FAKE_USER = {
  name: 'Peter',
  email: 'peter@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside AuthProvider');

  return context;
}

export { AuthProvider, useAuth };

/* now on the login form what we want to happen is when the user clicks on the login button then the application should call the login function in which we will then check if the user's credentials are correct */

/* we need two state variables where one contains the user object and the other one stores whether the user is currently authenticated or not and we do that using reducer as these two state variables will always be updated at the same time */

/* above as we set both the user and authentication one might think that then we don't even need this part '...state' as we replace the whole state however we should always do it like we have above because it makes our code more future proof meaning if we add some other state variables then we will need to add '...state' it all over the place where it is not present which could create bugs as we might forget to add it */
