import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getBalance, getProfile } from "../../redux/slices/slicer";
import { User } from "../../Type/User";
import Box from "../Atoms/Box";
import Image from "../Atoms/Image";

const DasboardProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = sessionStorage.getItem('sims-ppob-tkn');
  const [isBalanceHidden, setIsBalanceHidden] = useState(false); // State untuk sembunyikan saldo

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
      dispatch(getBalance(token));
    }
  }, [dispatch, token]);

  const user: User = useSelector((state: RootState) => state.slicer.user) || {};
  const balance: number = useSelector((state: RootState) => state.slicer.balance) || 0;

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden((prev) => !prev);
  };

  return (
    <Box className="flex flex-row items-center justify-between">
      <Box className="my-8">
        <Image src={user.profile_image || ''} alt={user.first_name || ''} className="rounded-full w-20 h-20 mb-2" />
        <h1 className="font-semibold text-2xl">Selamat datang,</h1>
        <h1 className="font-semibold text-2xl">{user.first_name + ' ' + user.last_name}</h1>
      </Box>
      <Box className="bg-red-500 p-4 rounded-lg w-[60%]">
        <h1 className="text-base text-white">Saldo Anda</h1>
        {isBalanceHidden ? (
          <h1 className="font-semibold text-2xl my-2 text-white">Rp. *******</h1>
        ) : (
          <h1 className="font-semibold text-2xl my-2 text-white">Rp. {balance.toLocaleString()}</h1>
        )}
        <a 
          onClick={toggleBalanceVisibility} 
          className=" text-white hover:text-slate-100 underline cursor-pointer">
          {isBalanceHidden ? "Tampilkan Saldo" : "Sembunyikan Saldo"}
        </a>
      </Box>
    </Box>
  );
};

export default DasboardProfile;