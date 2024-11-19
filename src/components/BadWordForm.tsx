import axios, { AxiosError } from "axios";
import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { IBadWord, IRubric } from "../types";
import { EntityFormProps, HTMLInputOrSelectElement } from "./EntityFormWrapper";
import Error from "./Error";
import { Success } from "./Success";

export function BadWordForm({ row, addOrEditRow }: EntityFormProps<IBadWord>) {
  const columns = ["word"] as Extract<keyof IBadWord, string>[];

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
        Word:
        <input type="text" id="word" />
      </p>
      <Link onClick={() => addOrEditRow(columns)} to={"/badword"}>
        Add/Edit
      </Link>
    </form>
  );
}
