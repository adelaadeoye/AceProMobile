import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { createUser } from './firestore-updateUser';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (email, password) => auth().signInWithEmailAndPassword(email, password),
        register: (email, password, userDetails) => {
          try {
            auth().createUserWithEmailAndPassword(email, password).then(res => {
              const { first_name, last_name } = userDetails
              auth().currentUser.updateProfile({
                displayName: `${first_name} ${last_name}`
              })
              createUser(email, userDetails)
              let user = auth().currentUser
              setUser(user)
            }).catch(e => console.log(e))
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};