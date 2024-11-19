import axios, { AxiosError } from "axios";
import { IEntity, IRubric } from "../types";
import { Link } from "react-router-dom";

interface EntityPageRowProps<T> {
  entity: string;
  row: T;
  columns: Extract<keyof T, string>[];
  fetchData: () => void;
}

export function EntityPageRow<T extends IEntity>({
  entity,
  row,
  columns,
  fetchData,
}: EntityPageRowProps<T>) {
  async function deleteRow() {
    const url = `http://localhost:8080/Forum_Buchyn/rest/${entity}/delete/${row.id}`;
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
        <td key={row.id + column}>{String(row[column])}</td>
      ))}
      <td>
        <Link to={`/${entity}form`} state={{ mode: "edit", row: row }}>
          Update
        </Link>
        <button onClick={deleteRow}>Delete</button>
      </td>
    </tr>
  );
}
