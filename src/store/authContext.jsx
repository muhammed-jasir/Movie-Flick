import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log(user)

    const signup = async (name, email, password, phone) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

            await updateProfile(user, {
                displayName: name,
            });

            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                name,
                email,
                phone,
                authProvider: 'local',
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signout = () => {
        return signOut(auth);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ signup, login, signout, user, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};