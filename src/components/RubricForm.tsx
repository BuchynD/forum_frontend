import axios, { AxiosError } from "axios";
import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { IRubric } from "../types";
import { EntityFormProps, HTMLInputOrSelectElement } from "./EntityFormWrapper";
import Error from "./Error";
import { Success } from "./Success";

export function RubricForm({ row, addOrEditRow }: EntityFormProps<IRubric>) {
  const columns = ["name", "description"] as Extract<keyof IRubric, string>[];

  useEffect(() => {
    if (row) {
      columns.map(
        (i) =>
          ((document.querySelector(`#${i}`) as HTMLInputOrSelectElement).value =
            String(row[i]))
      );
    } else {
      columns.map(
        (i) =>
          ((document.querySelector(`#${i}`) as HTMLInputOrSelectElement).value =
            "")
      );
    }
  }, []);

  return (
    <form>
      <p>
        Name:
        <input type="text" id="name" />
      </p>
      <p>
        Description:
        <input type="text" id="description" />
      </p>
      <Link onClick={() => addOrEditRow(columns)} to={"/rubric"}>
        Add/Edit
      </Link>
    </form>
  );
}
