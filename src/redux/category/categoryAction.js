import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { toast } from "react-toastify";
import { setCategoryList } from "./categorySlice";
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
const fetchCategoriesAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    console.log(querySnapshot);
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
