import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/Firebase";
import { toast } from "react-toastify";
import { setCategoryList } from "./categorySlice";

import { TBL_CATEGORY } from "../../utils/const";
import { setModalShow } from "../systemState/systemSlice";
export const addCategoryAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const catPromise = setDoc(doc(db, "categories", slug), rest, {
        merge: true,
      });
      toast.promise(catPromise, {
        pending: "In Progress ....",
        success: "Successfully saved",
      });
      dispatch(fetchCategoriesAction());
    } catch (e) {
      toast.error(e.message);
    }
  };
export const fetchCategoriesAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    console.log("within the action", querySnapshot);
    const catList = [];
    querySnapshot.forEach((doc) => {
      const slug = doc.id;
      const data = doc.data();
      catList.push({ ...data, slug });
    });
    dispatch(setCategoryList(catList));
  } catch (e) {
    toast.error(e.message);
  }
};
export const deleteCategoryAction = (slug) => async (dispatch) => {
  try {
    const deletePromise = deleteDoc(doc(db, TBL_CATEGORY, slug));
    toast.promise(deletePromise, {
      pending: "In Progress...",
      error: "Error...",
      success: "Successfully Removed",
    });
    await deletePromise;
    dispatch(setModalShow(false));
    dispatch(fetchCategoriesAction());
  } catch (error) {}
};
