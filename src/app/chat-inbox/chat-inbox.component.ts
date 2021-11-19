import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { ChatserviceService } from '../chatservice.service';
const SOCKET_ENDPOINT = 'http://localhost:3000';
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  socket;
  message: string;
  welcomeMsg: string;
constructor(private chatService: ChatserviceService) {
  this.welcomeMsg = 'Your chat messages here';
}
ngOnInit() {
  this.setHistoryData();
  this.setupSocketConnection();
}

async setHistoryData() {
  const response = await this.chatService.getHistory();
  if (response && response.length) {
    this.welcomeMsg = null;
    response.forEach(respObject => {
      const element = document.createElement('li');
      element.innerHTML = respObject.message;
      element.style.background = 'white';
      element.style.padding =  '15px 30px';
      element.style.margin = '10px';
      if(respObject.user === 'me') {
        element.style.textAlign = 'right';
      }
      document.getElementById('message-list').appendChild(element);
    });
  }
}
setupSocketConnection() {
  this.socket = io(SOCKET_ENDPOINT);
  this.socket.on('message-broadcast', (data: string) => {
  if (data) {
   const element = document.createElement('li');
   element.innerHTML = data;
   element.style.background = 'white';
   element.style.padding =  '15px 30px';
   element.style.margin = '10px';
   document.getElementById('message-list').appendChild(element);
   }
 });
}

sendMessage() {
  this.welcomeMsg = null;
  this.socket.emit('message', this.message);
  const element = document.createElement('li');
  element.innerHTML = this.message;
  element.style.background = 'white';
  element.style.padding =  '15px 30px';
  element.style.margin = '10px';
  element.style.textAlign = 'right';
  document.getElementById('message-list').appendChild(element);
  this.message = '';
}
}
