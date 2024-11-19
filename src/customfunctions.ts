import axios from "axios";
import { IEntity } from "./types";

export async function fetchData<T extends IEntity>(entity: string) {
  const url = `http://localhost:8080/Forum_Buchyn/rest/${entity}/getAll`;
  const { data: response } = await axios.get<T[]>(url);
  response.sort((a, b) => (a.id < b.id ? -1 : 1));
  return response;
}
