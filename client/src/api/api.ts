import axios from 'axios';
import { DataApi } from './dataApi';

const instance = axios.create({
  baseURL: '/',
  timeout: 10000,
});

export const dataApi = new DataApi(instance);
