import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/Firebase";
import { TBL_PAYMENT_OPTION } from "../../utils/const";
import { setModalShow } from "../systemState/systemSlice";
import { setPaymentOptionList } from "./paymentOptionsSlice";

// SetDoc : It will either create or Update
export const addPaymentOptionAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const paymentOptionPromise = setDoc(
        doc(db, TBL_PAYMENT_OPTION, slug),
        rest,
        {
          merge: true,
        }
      );
      toast.promise(paymentOptionPromise, {
        pending: "In Progress...",
        error: "Error...",
        success: "Successfully Saved",
      });
      dispatch(fetchPaymentOptionsAction());
    } catch (e) {
      console.log("error", e);
      toast.error("Error", e.message);
    }
  };

export const fetchPaymentOptionsAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, TBL_PAYMENT_OPTION));
    console.log(querySnapshot);
    const paymentOptList = [];
    querySnapshot.forEach((doc) => {
      const slug = doc.id;
      const data = doc.data();
      paymentOptList.push({
        ...data,
        slug,
      });
    });
    dispatch(setPaymentOptionList(paymentOptList));
  } catch (e) {
    toast.error(e.message);
  }
};

export const deletePaymentOptionAction = (slug) => async (dispatch) => {
  try {
    const deletePromise = deleteDoc(doc(db, TBL_PAYMENT_OPTION, slug));
    toast.promise(deletePromise, {
      pending: "In Progress...",
      error: "Error...",
      success: "Successfully Removed",
    });
    await deletePromise;
    dispatch(setModalShow(false));
    dispatch(fetchPaymentOptionsAction());
  } catch (error) {}
};
