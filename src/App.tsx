import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./App.scss";

import { FragmentGenerator } from "./components/FragmentGenerator";
import { Numbers } from "./components/Numbers";

const K = {
    FRAGMENTS: "fragments",
    KANA: "kana",
    NUMBERS: "numbers",
};

const DEFAULT_KEY: string =K.FRAGMENTS;
//const DEFAULT_KEY: string =K.NUMBERS;

function App() {
    const [tab, setTab] = useState(DEFAULT_KEY);

    return (
        <Tabs
            id="tabs"
            activeKey={tab}
            onSelect={(k, e) => setTab(k || DEFAULT_KEY)}
        >
            <Tab eventKey={K.FRAGMENTS} title="Fragments">
                <FragmentGenerator is_active={tab === K.FRAGMENTS} />
            </Tab>
            <Tab eventKey={K.NUMBERS} title="Numbers">
                <Numbers />
            </Tab>
        </Tabs>
    );
}

export default App;
