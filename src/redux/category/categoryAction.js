import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { toast } from "react-toastify";

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
    } catch (e) {
      toast.error(e.message);
    }
  };
