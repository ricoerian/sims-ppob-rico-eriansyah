import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { login } from '../redux/slices/slicer';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../Middleware/Validate';
import Card from '../Components/Atoms/Card';
import {Input} from '../Components/Atoms/Input';
import Button from '../Components/Atoms/Button';
import Form from '../Components/Molecules/Form';
import Box from '../Components/Atoms/Box';
import Image from '../Components/Atoms/Image';
import { showToast } from '../redux/slices/toastSlices';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.slicer);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin({ email, password, setErrors })) {
      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        dispatch(showToast({ message: 'Berhasil Login!', type: 'success' }));
        navigate('/dashboard');
      } else {
        dispatch(showToast({ message: error ?? 'Terjadi sebuah kesalahan, silahkan periksa kembali!', type: 'error' }));
      }
    }
  };

  return (
    <Card>
      <Box className='w-[50%] my-auto'>
        <Form onSubmit={handleSubmit} className="p-6">
            <Box className='flex flex-row justify-center mb-4 gap-2'>
                <Image src="/assets/images/Logo.png" alt="Logo" />
                <h1 className="text-2xl font-semibold">SIMS PPOB</h1>
            </Box>
            <h2 className="text-2xl font-semibold mb-4 text-center">Masuk atau buat akun untuk memulai</h2>
            <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="text-red-500 mb-4">{errors.email}</p>}
            <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}  
            <Button type='submit' className='w-full'>
            {loading ? 'Sedang Masuk...' : 'Masuk'}
            </Button>
            <p className='text-center mt-2'>belum punya akun? registrasi <a href="/register" className='text-blue-500 hover:text-blue-400 underline'>di sini</a></p>
        </Form>
      </Box>
      <Box className='w-[50%]'>
        <Image src="/assets/images/Illustrasi-Login.png" alt="Illustrasi" className='rounded-br rounded-tr' />
      </Box>
    </Card>
  );
};

export default Login;