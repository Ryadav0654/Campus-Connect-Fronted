import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../lib/api-client";
import { LOGIN_ROUTE, LOGOUT_ROUTE, REGISTER_ROUTE, CURRENT_USER_ROUTES } from "../../utils/constants";
import { setToken, removeToken } from "../../utils/HelperFunctions";

export const signup = createAsyncThunk("auth/register", async (payload, thunkAPI) => {
    try {
        const response = await apiClient.post(
            REGISTER_ROUTE,
            payload,
            { withCredentials: true }
          );

          return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
        // console.log("register error", error);
        
    }
})


export const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const response = await apiClient.post(LOGIN_ROUTE, payload, {
      withCredentials: true,
    });

    // console.log({ response });
    const { accessToken, refreshToken} = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (response.data) {
      return response.data;
    }

  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
    // console.log("login error", error.message);
  }
});

export const getUserData = createAsyncThunk("auth/getUserData", async () => {
    try {
        const response = await apiClient.get(
            CURRENT_USER_ROUTES,
            { withCredentials: true }
          );
          if(response.data){
            return response.data;
          }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
        removeToken();
        // console.log("getUserdata error", error);
        
    }
})

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        const response = await apiClient.post(LOGOUT_ROUTE, {}, {
            withCredentials: true
          });
          // console.log({ response });
          removeToken();
          return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
        // console.log("logout error", error);
        
    }
})
