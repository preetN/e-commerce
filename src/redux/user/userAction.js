import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../config/Firebase";
import { setAdmin, updateStatus } from "./userSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { TBL_USERS } from "../../utils/const";
export const updateProfile =
  ({ uid, ...rest }) =>
  async (dispatch) => {
    try {
      const catPromise = setDoc(doc(db, TBL_USERS, uid), rest, {
        merge: true,
      });
      toast.promise(catPromise, {
        pending: "In Progress...",
        error: "Error...",
        success: "Successfully Saved",
      });
      dispatch(getUserAction(uid));
    } catch (e) {
      console.log("error", e);
      toast.error("Error", e.message);
    }
  };

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
