import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Permite cualquier origen, cámbialo si necesitas restringirlo
    methods: ['GET', 'POST'], // Métodos permitidos
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private users: number = 0;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.users++;
    this.server.emit('users', this.users);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users--;
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    console.log(`Message: ${payload}`);
    this.server.emit('message', payload);
  }

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }
}
