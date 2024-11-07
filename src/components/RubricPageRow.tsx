import axios, { AxiosError } from "axios";
import { IRubric } from "../types";
import { Link } from "react-router-dom";

interface RubricPageRowProps {
  row: IRubric;
  columns: (keyof IRubric)[];
  fetchData: () => void;
}

export function RubricPageRow({ row, columns, fetchData }: RubricPageRowProps) {
  async function deleteRow() {
    const url = `http://localhost:8080/Forum_Buchyn/rest/rubric/delete/${row.id}`;
    try {
      await axios.delete(url);
      fetchData();
    } catch (e: unknown) {
      console.log(e);
    }
  }
  return (
    <tr>
      {columns.map((column) => (
        <td key={row.id + column}>{row[column]}</td>
      ))}
      <td>
        <Link to={"/rubricform"} state={{ mode: "edit", row: row }}>
          Update
        </Link>
        <button onClick={deleteRow}>Delete</button>
      </td>
    </tr>
  );
}
