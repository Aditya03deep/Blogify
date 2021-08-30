import { AUTH } from './actionTypes';
import * as api from '../api/index.js';

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);

    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};