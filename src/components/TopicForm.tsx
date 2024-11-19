import axios, { AxiosError } from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../customfunctions";
import { IRubric, ITopic, IUser } from "../types";
import { EntityFormProps } from "./EntityFormWrapper";
import Loading from "./Loading";

export function TopicForm({ row, addOrEditRow }: EntityFormProps<ITopic>) {
  const columns = ["title", "authorId", "rubricId"] as Extract<
    keyof ITopic,
    string
  >[];

  const [users, setUsers] = useState<IUser[]>([]);
  const [rubrics, setRubrics] = useState<IRubric[]>([]);
  const [ready, setReady] = useState(false);

  // Define refs for each field
  const titleRef = useRef<HTMLInputElement>(null);
  const authorIdRef = useRef<HTMLSelectElement>(null);
  const rubricIdRef = useRef<HTMLSelectElement>(null);

  async function getForeignKeys() {
    try {
      const [userResponse, rubricResponse] = await Promise.all([
        fetchData<IUser>("user"),
        fetchData<IRubric>("rubric"),
      ]);
      setUsers(userResponse);
      setRubrics(rubricResponse);
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
      if (titleRef.current) titleRef.current.value = row.title;
      if (authorIdRef.current) authorIdRef.current.value = String(row.authorId);
      if (rubricIdRef.current) rubricIdRef.current.value = String(row.rubricId);
    } else {
      // Clear refs if row doesn't exist
      if (titleRef.current) titleRef.current.value = "";
      if (authorIdRef.current) authorIdRef.current.value = "";
      if (rubricIdRef.current) rubricIdRef.current.value = "";
    }
  }, [row]);

  if (!ready) return <Loading />;

  return (
    <form>
      <p>
        Title:
        <input type="text" id="title" ref={titleRef} />
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
        Rubric:
        <select id="rubricId" ref={rubricIdRef}>
          {rubrics.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
      </p>
      <Link onClick={() => addOrEditRow(columns)} to={"/topic"}>
        Add/Edit
      </Link>
    </form>
  );
}
