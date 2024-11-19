import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { RubricPage } from "./components/RubricPage";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { RubricForm } from "./components/RubricForm";
import { EntityPage } from "./components/EntityPage";
import { IBadWord, IMessage, IRubric, ITopic, IUser } from "./types";
import {
  EntityFormProps,
  EntityFormWrapper,
} from "./components/EntityFormWrapper";
import { BadWordForm } from "./components/BadWordForm";
import { TopicForm } from "./components/TopicForm";
import { UserForm } from "./components/UserForm";
import { MessageForm } from "./components/MessageForm";

function App() {
  const entities = ["rubric", "user", "topic", "message", "badword"];
  return (
    <div className="App">
      <Router>
        <nav>
          {entities.map((el) => (
            <Link to={`/${el.toLowerCase()}`}>/{el} </Link>
          ))}
        </nav>
        <Routes>
          {/* <Route path="/rubric" element={<RubricPage />} />
          <Route path="/rubricform" element={<RubricForm />} /> */}
          {entities.map((i) => (
            <Route path={`/${i}`} element={<EntityPage entity={i} />} />
          ))}
          <Route
            path="/rubricform"
            element={
              <EntityFormWrapper<IRubric>
                entity="rubric"
                ActualForm={RubricForm}
              />
            }
          />
          <Route
            path="/badwordform"
            element={
              <EntityFormWrapper<IBadWord>
                entity="badword"
                ActualForm={BadWordForm}
              />
            }
          />

          <Route
            path="/userform"
            element={
              <EntityFormWrapper<IUser> entity="user" ActualForm={UserForm} />
            }
          />

          <Route
            path="/topicform"
            element={
              <EntityFormWrapper<ITopic>
                entity="topic"
                ActualForm={TopicForm}
              />
            }
          />
          <Route
            path="/messageform"
            element={
              <EntityFormWrapper<IMessage>
                entity="message"
                ActualForm={MessageForm}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
