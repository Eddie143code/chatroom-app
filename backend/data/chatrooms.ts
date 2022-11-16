export type chatroom =
  | {
      name: string;
    }
  | undefined;

export type datatype = [chatroom];

const data: [] = [];

const dataFinal: chatroom[] = data.map((obj) => {
  const object: chatroom = obj;
  return object;
});

export default dataFinal;
