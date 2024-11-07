import axios, { AxiosError } from "axios";
import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IRubric } from "../types";
import Error from "./Error";
import { Success } from "./Success";

interface RubricFormProps {
  mode: "add" | "edit";
  row?: IRubric;
}

export function RubricForm() {
  const locationState = useLocation().state as RubricFormProps;
  const [mode, row] = [
    locationState?.mode || "add",
    locationState?.row || ({} as IRubric),
  ];
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  function getValuesFromHTMLElements() {
    const name = (document.querySelector("#rubric_name") as HTMLInputElement)
      .value;
    const description = (
      document.querySelector("#rubric_description") as HTMLInputElement
    ).value;
    return [name, description];
  }
  async function addOrEditRow(columns: string[]) {
    let url;
    switch (mode) {
      case "add":
        url = `http://localhost:8080/Forum_Buchyn/rest/rubric/add/${columns.join(
          "/"
        )}`;
        break;
      case "edit":
        url = `http://localhost:8080/Forum_Buchyn/rest/rubric/update/${
          row?.id
        }/${columns.join("/")}`;
    }

    try {
      const r = await (mode === "add" ? axios.put(url) : axios.post(url));
      setSuccess(true);
      setError("");
    } catch (e: unknown) {
      console.log(e);
      const error = e as AxiosError;
      setError(error.message);
    }
  }

  useEffect(() => {
    if (mode == "edit") {
      (document.querySelector("#rubric_name") as HTMLInputElement).value =
        row.name;
      (
        document.querySelector("#rubric_description") as HTMLInputElement
      ).value = row.description;
    } else if (mode == "add") {
      (document.querySelector("#rubric_name") as HTMLInputElement).value = "";
      (
        document.querySelector("#rubric_description") as HTMLInputElement
      ).value = "";
    }
  }, []);

  return (
    <form>
      <p>
        Name:
        <input type="text" id="rubric_name" />
      </p>
      <p>
        Description:
        <input type="text" id="rubric_description" />
      </p>
      <button onClick={() => addOrEditRow(getValuesFromHTMLElements())}>
        {mode}
      </button>
      {success && <Success />}
      {error && <Error error={error} />}
    </form>
  );
}
