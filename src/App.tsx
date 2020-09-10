import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import "./App.scss";

import { mask } from "./util";
import { LangModule, LangModuleMask } from "./LangModule";
import { SourceComponent } from "./components/Source";
import { GeneratorComponent } from "./components/Generator";
import { ModulesComponent } from "./components/Modules";

// Default source for language module data
const DEFAULT_SOURCE = "https://raw.githubusercontent.com/nilsso/nilsso.github.io/code/static/apps/lang_modules/japanese_modules.json";
//const DEFAULT_SOURCE = "https://raw.githubusercontent.com/nilsso/nilsso.github.io/code/static/apps/lang_modules/japanese_modules_test.json";
//const DEFAULT_SOURCE = "https://gist.githubusercontent.com/nilsso/bdf52edd7e207b9fb3ccdb74fd774973/raw/";

// Fetch ("GET" request) file from URL and parse a JSON
async function requestJSON(url: string) {
    var module_data;
    await fetch(url)
        .then(response => response.json())
        .then(data => module_data = data)
        .catch(e => alert("Invalid source URL\n" + e));
    if (module_data) {
        return module_data;
    } else {
        return [];
    }
}

function App() {
    // Module source
    const [source, setSource] = useState(DEFAULT_SOURCE);
    // Modules
    const [modules, setModules] = useState(Array<LangModule>(0));
    // Joined module
    const [joined, setJoined] = useState(LangModule.empty());
    // Module masks
    const [enabledMask, setEnabledMask] = useState(mask(0, false));
    const [fragmentMask, setFragmentMask] = useState(mask(0, true));
    const [vocabMask, setVocabMask] = useState(mask(0, true));

    // If module source changed build new modules
    useEffect(() => {
        requestJSON(source).then(data => setModules(data.map(json => LangModule.from_json(json))));
    }, [source]);

    // If modules changed update the module masks
    useEffect(() => {
        setEnabledMask(mask(modules.length, false));
        setFragmentMask(mask(modules.length, true));
        setVocabMask(mask(modules.length, true));
    }, [modules]);

    // If module masks changed update the joined module
    useEffect(() => {
        if (modules.length > 0) {
            setJoined(LangModule.join(modules, new LangModuleMask(enabledMask, fragmentMask, vocabMask)));
        }
    }, [modules, enabledMask, fragmentMask, vocabMask]);

    return (
        <Container>
            <Row>
                <GeneratorComponent joined={joined} enabledMask={enabledMask} />
                <ModulesComponent
                    modules={modules}

                    enabledMask={enabledMask}
                    setEnabledMask={setEnabledMask}

                    fragmentMask={fragmentMask}
                    setFragmentMask={setFragmentMask}

                    vocabMask={vocabMask}
                    setVocabMask={setVocabMask}
                />
            </Row>
            <SourceComponent source={source} setSource={setSource} />
        </Container>
    );
}

export default App;
