import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, deleteUser, EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updatePassword } from 'firebase/auth';
import { setDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db, storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    const signup = async (name, email, password, phone) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

            await updateProfile(user, { displayName: name });

            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                name,
                email,
                phone,
                profilePic: '',
                authProvider: user.providerData[0]?.providerId,
            });

            await sendEmailVerification(user);
            toast.success('Verification email sent');
        } catch (error) {
            console.error(`Signup failed: ${error.message}`);
        }
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signout = () => {
        return signOut(auth);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const googleSignin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            const user = res.user;

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber,
                    profilePic: user.photoURL,
                    authProvider: user.providerData[0]?.providerId,
                });
            }
        } catch (error) {
            console.error(`Google signin failed: ${error.message}`);
        }
    }

    const uploadImage = async (imageFile) => {
        try {
            const storageRef = ref(storage, `profiles/${user.uid}`);
            const uploadTask = await uploadBytes(storageRef, imageFile);
            const downloadURL = await getDownloadURL(uploadTask.ref);
            return downloadURL;
        } catch (error) {
            console.error(`Image upload failed: ${error.message}`);
            throw error;
        }
    }

    const updateUserProfile = async (name, phone, profilePic) => {
        const userRef = doc(db, "users", user.uid);

        const userObj = {
            name,
            phone
        }

        if (profilePic) {
            userObj.profilePic = profilePic;
        }

        await updateDoc(
            userRef,
            userObj
        );

        await updateProfile(user, {
            displayName: name,
            photoURL: profilePic,
        });
    }

    const deleteUserProfile = async (password) => {
        try {
            const isEmailUser = user.providerData.some(
                (provider) => provider.providerId === 'password'
            );

            const isGoogleUser = user.providerData.some(
                (provider) => provider.providerId === 'google.com'
            );

            if (isEmailUser) {
                const credencial = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credencial);
            }

            if (isGoogleUser) {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
                toast.success('Reauthenticated with Google.');
            }

            const userRef = doc(db, "users", user.uid);
            await deleteDoc(userRef);

            await deleteUser(user);
        } catch (error) {
            console.error(`Error deleting user: ${error.message}`);

        }
    }

    const updateUserPassword = async (currentPassword, newPassword) => {
        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword);
        } catch (error) {
            console.error(`Password update failed: ${error.message}`);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userRef);
                setUserData(userDoc.data());
            } else {
                setUserData(null);
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ signup, login, signout, user, resetPassword, googleSignin, userData, uploadImage, updateUserProfile, deleteUserProfile, updateUserPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};