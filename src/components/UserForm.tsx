import axios, { AxiosError } from "axios";
import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { IBadWord, IRubric, IUser } from "../types";
import { EntityFormProps, HTMLInputOrSelectElement } from "./EntityFormWrapper";
import Error from "./Error";
import { Success } from "./Success";

export function UserForm({ row, addOrEditRow }: EntityFormProps<IUser>) {
  const columns = ["username", "email"] as Extract<keyof IUser, string>[];

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
        Username:
        <input type="text" id="username" />
      </p>
      <p>
        Email:
        <input type="email" id="email" />
      </p>
      <Link onClick={() => addOrEditRow(columns)} to={"/user"}>
        Add/Edit
      </Link>
    </form>
  );
}
