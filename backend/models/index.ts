import { Chatroom } from "./chatroom";
import { User } from "./users";

Chatroom.sync();
User.sync();

export { User, Chatroom };
