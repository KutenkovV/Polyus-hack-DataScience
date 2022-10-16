import { AxiosInstance } from 'axios';
import { IData } from '../types/data.interface';

export class DataApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  public async fetchData() {
    return this.instance
      .get<IData>('http://127.0.0.1:5000/get-image')
      .then((response) => response.data);
  }
}
