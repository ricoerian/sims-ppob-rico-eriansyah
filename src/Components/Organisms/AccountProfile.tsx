import { useDispatch, useSelector } from "react-redux";
import { Input, InputFile } from "../Atoms/Input";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getProfile, logout, putProfile } from "../../redux/slices/slicer";
import { User } from "../../Type/User";
import Box from "../Atoms/Box";
import Form from "../Molecules/Form";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../redux/slices/toastSlices";

const AccountProfile = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('sims-ppob-tkn') || '';

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user: User = useSelector((state: RootState) => state.slicer.user) || {};
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(putProfile({ token, first_name, last_name, email }));
    if (putProfile.fulfilled.match(result)) {
      dispatch(showToast({ message: 'Data user berhasil diubah!', type: 'success' }));
      navigate('/akun');
    } else {
      dispatch(showToast({ message: 'Terjadi sebuah kesalahan, silahkan periksa kembali!', type: 'error' }));
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ message: 'Berhasil keluar!', type: 'success' }));
    navigate('/');
  };

  return (
    <Box className="my-8">
      <InputFile fileImage={user.profile_image || ''} />
      <h1 className="text-center text-3xl font-semibold my-4">{user.first_name + ' ' + user.last_name}</h1>
      <Form className="w-[50%] m-auto" onSubmit={handleSubmit}>
        <Box className="flex flex-col gap-2">
          <label className="text-sm">Email</label>
          <Input 
            type='email' 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Box>
        <Box className="flex flex-col gap-2">
          <label className="text-sm">Nama Depan</label>
          <Input 
            type='text' 
            placeholder='First Name' 
            value={first_name} 
            onChange={(e) => setFirstName(e.target.value)} 
          />
        </Box>
        <Box className="flex flex-col gap-2">
          <label className="text-sm">Nama Belakang</label>
          <Input 
            type='text' 
            placeholder='Last Name' 
            value={last_name} 
            onChange={(e) => setLastName(e.target.value)} 
          />
        </Box>
        <Box className="flex flex-col gap-2">
          <Button 
            type="submit" 
            className="w-full bg-white !text-red-500 border !border-red-500 hover:!bg-red-100 hover:!border-transparent"
          >
            Edit Profile
          </Button>
          <Button 
            type="button" 
            className="w-full" 
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default AccountProfile;
