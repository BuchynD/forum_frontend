import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IRubric } from "../types";
import Loading from "./Loading";
import { RubricPageRow } from "./RubricPageRow";

interface IEntity {
  id: number;
}

interface EntityPageProps {
  entity: string;
}

export function EntityPage<T extends IEntity>({ entity }: EntityPageProps) {
  const url = `http://localhost:8080/Forum_Buchyn/rest/${entity}/getAll`;

  const [error, setError] = useState("");

  const [data, setData] = useState<T[]>([]);
  let columns: Extract<keyof T, string>[] = [];
  if (data.length > 0) {
    columns = Object.keys(data[0]) as Extract<keyof T, string>[];
  }

  async function fetchData() {
    try {
      const { data: response } = await axios.get<T[]>(url);
      response.sort((a, b) => (a.id < b.id ? -1 : 1));
      setData(response);
      setError("");
    } catch (e: unknown) {
      console.log(e);
      const error = e as AxiosError;
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((i) => (
            <th key={i}>{i}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* {data.map((row) => (
          <RubricPageRow
            row={row}
            columns={columns}
            fetchData={fetchData}
            key={row.id}
          />
        ))} */}
      </tbody>
      <tfoot>
        {!data.length && <Loading />}
        <Link to={`/${entity}form`} state={{ mode: "add" }}>
          Add
        </Link>
      </tfoot>
    </table>
  );
}
