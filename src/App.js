import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//packages
import axios from "axios";
import { atom, selector } from "recoil";

//styles
import "./App.css";
import "./styles.css";

//components
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

//incoming state
import { setUserAtom } from "./components/Header";

const urlArray = [
  {
    user: 1,
    url: "https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json",
  },
  {
    user: 2,
    url: "https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json",
  },
  {
    user: 3,
    url: "https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json",
  },
];

export const userAtom = atom({
  key: "userUrl",
  default: "",
});

export const grabData = selector({
  key: "userData1",
  get: async ({ get }) => {
    let arr = [];
    let user = get(setUserAtom);
    let url = "";
    urlArray.forEach((e) => {
      if (e.user === parseInt(user === "" ? "1" : user)) {
        url = e.url;
      }
    });
    document.title = `Eight Sleep - User ${user === "" ? "1" : user}`;
    try {
      let grab = await axios.get(url).then((res) => {
        arr.push(res.data.intervals);
      });

      return arr;
    } catch (err) {
      console.log(err);
    }
  },
});

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Router>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
