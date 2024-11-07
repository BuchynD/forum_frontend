import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IRubric } from "../types";
import Loading from "./Loading";
import { RubricPageRow } from "./RubricPageRow";

interface RubricPageProps {}

export function RubricPage() {
  const url = "http://localhost:8080/Forum_Buchyn/rest/rubric/getAll";

  const [error, setError] = useState("");

  const [data, setData] = useState<IRubric[]>([]);
  let columns: (keyof IRubric)[] = [];
  if (data.length > 0) {
    columns = Object.keys(data[0]) as (keyof IRubric)[];
  }

  async function fetchData() {
    try {
      const { data: response } = await axios.get<IRubric[]>(url);
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
        {data.map((row) => (
          <RubricPageRow
            row={row}
            columns={columns}
            fetchData={fetchData}
            key={row.id}
          />
        ))}
      </tbody>
      <tfoot>
        {!data.length && <Loading />}
        <Link to={"/rubricform"} state={{ mode: "add" }}>
          Add
        </Link>
      </tfoot>
    </table>
  );
}
