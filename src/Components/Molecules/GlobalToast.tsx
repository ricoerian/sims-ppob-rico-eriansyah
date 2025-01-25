import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Toast from "../Atoms/Toast";
import { hideToast } from "../../redux/slices/toastSlices";

export const GlobalToast = () => {
  const { message, type, isVisible } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  if (!isVisible) return null;

  return (
    <Toast
      message={message}
      type={type}
      duration={3000}
      onClose={() => dispatch(hideToast())}
    />
  );
};