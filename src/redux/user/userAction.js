import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../config/Firebase";
import { setAdmin } from "./userSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
export const signUpAction = (form) => (dispatch) => {
  createUserWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => {
      const user = userCredential.user;
      toast.success("SignedUp " + user.email + " successfully");
      console.log(user.email);
      const { password, cpassword, ...rest } = form;

      //   dispatch(setAdmin(rest));
      addUserAction(user.uid, rest);
    })
    .catch((error) => {
      console.log(error.message);
      toast.error(error.message);
    });
};
export const addUserAction = async (uid, form) => {
  await setDoc(doc(db, "admin", uid), { uid, ...form });
};
export const getUserAction = (uid) => async (dispatch) => {
  const docRef = doc(db, "admin", uid);
  const docSnap = await getDoc(docRef);
  let user = {};
  if (docSnap.exists()) {
    user = docSnap.data();
    dispatch(setAdmin(user));
  } else {
    console.log("no such thing");
  }
};
export const signInAction = (form) => (dispatch) => {
  signInWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(getUserAction(user.uid));
      toast.success("Log In Successfully");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
