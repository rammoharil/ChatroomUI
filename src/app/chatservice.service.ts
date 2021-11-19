import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  constructor() { }
  async getHistory() {
    const response = await axios.get(environment.historyDataUrl);
    return response.data;
  }
}
