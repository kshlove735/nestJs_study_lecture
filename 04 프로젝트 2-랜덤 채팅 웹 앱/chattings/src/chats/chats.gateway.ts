import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

//namespace : @Controller()의 endpoint와 유사한 개념 sciprt의 const socket = io('/chattings');과 매칭
@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
    this.logger.log('constructor');
  }

  // client와 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  // client와 연결이 되자마자 실행
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`); // nsp.name -> namespace 이름
  }

  // constructor 다음으로 제일 먼저 실행되는 메소드
  afterInit() {
    this.logger.log('init');
  }

  // 유저가 등장 했을때 유저 등록 및 다른 유저에게 broadcasting
  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string, // client한테 받은 메시지
    @ConnectedSocket() socket: Socket,
  ) {
    // broadcast : 연결된 모든 소켓들에게 데이터 전송
    socket.broadcast.emit('user_connected', username); // emit('이벤트 이름', 보내는 데이터);
    return username;
  }

  // 채팅 메시지 broadcasting
  @SubscribeMessage('submit_chat')
  handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // broadcast : 연결된 모든 소켓들에게 데이터 전송
    socket.broadcast.emit('new_chat', { chat, username: socket.id }); // emit('이벤트 이름', 보내는 데이터);
  }
}
