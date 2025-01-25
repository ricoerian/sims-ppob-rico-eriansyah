import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Transaction } from '../../Type/Transaction';
import { User } from '../../Type/User';
import { Service } from '../../Type/Services';

interface SlicerState {
  response: object | null;
  user: User | null;
  balance: number | null;
  services: Service[] | null;
  transactionHistory: Transaction[] | null;
  banners: object[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: SlicerState = {
  user: null,
  balance: null,
  services: null,
  transactionHistory: null,
  banners: null,
  response: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/login', credentials);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (userData: { email: string; password: string; first_name: string; last_name: string }) => {
  const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/registration', userData);
  return response.data;
});

export const getProfile = createAsyncThunk('get/profile', async (token: string) => {
  const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const getBalance = createAsyncThunk('get/balance', async (token: string) => {
  const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/balance', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const getBanners = createAsyncThunk('get/banner', async (token: string) => {
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/banner', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

export const getServices = createAsyncThunk('get/services', async (token: string) => {
  const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/services', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const getTransaction = createAsyncThunk('get/transaction', async ({ token, offset, limit }: { token: string; offset: number; limit: number }) => {
  const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/transaction/history', {
    params: { offset: offset, limit: limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const postTransaction = createAsyncThunk('post/transaction', async ({ token, service_code }: { token: string; service_code: string }) => {
  const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/transaction', { service_code: service_code }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const postBalance = createAsyncThunk('post/balance', async ({ token, top_up_amount }: { token: string; top_up_amount: number }) => {
  const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/topup', { top_up_amount: top_up_amount }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const putImage = createAsyncThunk('put/image', async ({ token, file }: { token: string; file: File }) => {
  const response = await axios.put('https://take-home-test-api.nutech-integrasi.com/profile/image', { file: file }, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const putProfile = createAsyncThunk('put/profile', async ({ token, first_name, last_name, email }: { token: string; first_name: string; last_name: string; email: string }) => {
  const response = await axios.put('https://take-home-test-api.nutech-integrasi.com/profile/update', { first_name: first_name, last_name: last_name, email: email }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const slicer = createSlice({
  name: 'slicer',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.balance = 0;
      state.services = [];
      state.banners = [];
      sessionStorage.removeItem('sims-ppob-tkn');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        sessionStorage.setItem('sims-ppob-tkn', action.payload.data.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Get Profile failed';
      })
      .addCase(getBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.data.balance;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Get Balance failed';
      })
      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Get Services failed';
      })
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Get Banners failed';
      })
      .addCase(getTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.offset === 0) {
          state.transactionHistory = action.payload.data.records || [];
        } else {
          state.transactionHistory = [
            ...(state.transactionHistory || []),
            ...(action.payload.data.records || []),
          ];
        }
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Post Transaction failed';
      })
      .addCase(postBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.data.balance;
      })
      .addCase(postBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Post Balance failed';
      })
      .addCase(putImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.profile_image = action.payload.data.profile_image;
        }
      })
      .addCase(putImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Put Image failed';
      })
      .addCase(putProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(putProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Put Profile failed';
      });
  },
});

export const { logout } = slicer.actions;
export default slicer.reducer;
