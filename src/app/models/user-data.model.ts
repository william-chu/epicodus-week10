import { Chat } from './chat.model';

export class UserData {
  constructor (public name: string, public chatList: Chat[]) { }
}
