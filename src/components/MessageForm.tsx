import axios, { AxiosError } from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../customfunctions";
import { IMessage, IRubric, ITopic, IUser } from "../types";
import { EntityFormProps } from "./EntityFormWrapper";
import Loading from "./Loading";

export function MessageForm({ row, addOrEditRow }: EntityFormProps<IMessage>) {
  const columns = ["content", "topicId", "authorId", "status"] as Extract<
    keyof IMessage,
    string
  >[];

  const [users, setUsers] = useState<IUser[]>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [ready, setReady] = useState(false);

  // Define refs for each field
  const contentRef = useRef<HTMLInputElement>(null);
  const authorIdRef = useRef<HTMLSelectElement>(null);
  const topicIdRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  async function getForeignKeys() {
    try {
      const [userResponse, topicResponse] = await Promise.all([
        fetchData<IUser>("user"),
        fetchData<ITopic>("topic"),
      ]);
      setUsers(userResponse);
      setTopics(topicResponse);
      setReady(true);
    } catch (e: unknown) {
      console.log(e);
      const error = e as AxiosError;
      alert(error.message);
    }
  }

  useEffect(() => {
    getForeignKeys();

    if (row) {
      // Populate refs if row exists
      if (contentRef.current) contentRef.current.value = row.content;
      if (authorIdRef.current) authorIdRef.current.value = String(row.authorId);
      if (topicIdRef.current) topicIdRef.current.value = String(row.topicId);
      if (statusRef.current) statusRef.current.value = String(row.status);
    } else {
      // Clear refs if row doesn't exist
      if (contentRef.current) contentRef.current.value = "";
      if (authorIdRef.current) authorIdRef.current.value = "";
      if (topicIdRef.current) topicIdRef.current.value = "";
      if (statusRef.current) statusRef.current.value = "";
    }
  }, [row]);

  if (!ready) return <Loading />;

  return (
    <form>
      <p>
        content:
        <input type="text" id="content" ref={contentRef} />
      </p>
      <p>
        Author:
        <select id="authorId" ref={authorIdRef}>
          {users.map((i) => (
            <option key={i.id} value={i.id}>
              {i.username}
            </option>
          ))}
        </select>
      </p>
      <p>
        Topic:
        <select id="topicId" ref={topicIdRef}>
          {topics.map((i) => (
            <option key={i.id} value={i.id}>
              {i.title}
            </option>
          ))}
        </select>
      </p>
      <p>
        Status:
        <select id="status" ref={statusRef}>
          {["active", "archived", "deleted"].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </p>
      <Link onClick={() => addOrEditRow(columns)} to={"/message"}>
        Add/Edit
      </Link>
    </form>
  );
}
