import axios, { AxiosError } from "axios";
import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IEntity, IRubric } from "../types";
import Error from "./Error";
import { Success } from "./Success";

export type HTMLInputOrSelectElement = HTMLInputElement | HTMLSelectElement;

export interface EntityFormProps<T extends IEntity> {
  row?: T;
  addOrEditRow: (columns: string[]) => Promise<void>;
}

interface EntityFormWrapperProps<T extends IEntity> {
  entity: string;
  ActualForm: React.FC<EntityFormProps<T>>;
}

interface EntityFormWrapperDynamicProps<T> {
  mode: "add" | "edit";
  row?: T;
}

export function EntityFormWrapper<T extends IEntity>({
  entity,
  ActualForm,
}: EntityFormWrapperProps<T>) {
  const locationState = useLocation().state as EntityFormWrapperDynamicProps<T>;
  const [mode, row] = [locationState?.mode || "add", locationState?.row];
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  async function addOrEditRow(columnNames: string[]) {
    const values = columnNames.map(
      (i) => (document.querySelector(`#${i}`) as HTMLInputOrSelectElement).value
    );
    let url;
    switch (mode) {
      case "add":
        url = `http://localhost:8080/Forum_Buchyn/rest/${entity}/add/${values.join(
          "/"
        )}`;
        break;
      case "edit":
        url = `http://localhost:8080/Forum_Buchyn/rest/${entity}/update/${
          row?.id
        }/${values.join("/")}`;
    }

    try {
      const r = await (mode === "add" ? axios.put(url) : axios.post(url));
      alert("Success!");
      // setError("");
    } catch (e: unknown) {
      console.log(e);
      const error = e as AxiosError;
      alert(error.message);
    }
  }

  return (
    <>
      <ActualForm row={row} addOrEditRow={addOrEditRow} />
      {success && <Success />}
      {error && <Error error={error} />}
    </>
  );
}
