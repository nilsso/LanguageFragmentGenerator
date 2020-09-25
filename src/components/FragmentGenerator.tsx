import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import { mask } from "../util";

import { LangModule, LangModuleMask } from "../LangModule";
import { SourceComponent } from "./fragment_generator/Source";
import { GeneratorComponent } from "./fragment_generator/Generator";
import { ModulesComponent } from "./fragment_generator/Modules";

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

export function FragmentGenerator(props: {
    is_active: boolean
}) {
    const is_active = props.is_active;
    // Module source
    const [source, setSource] = useState(DEFAULT_SOURCE);
    // Modules
    const [modules, setModules] = useState(Array<LangModule>(0));
    // Joined module
    const [joined, setJoined] = useState(LangModule.empty());
    // Module masks
    const [enabledMask, setEnabledMask] = useState(mask(0, false));
    const [fragmentMask, setFragmentMask] = useState(mask(0, false));
    const [vocabMask, setVocabMask] = useState(mask(0, false));

    // If module source changed build new modules
    useEffect(() => {
        requestJSON(source).then(data => setModules(data.map(json => LangModule.from_json(json))));
    }, [source]);

    // If modules changed update the module masks
    useEffect(() => {
        let fm = mask(modules.length, false);
        fm[fm.length - 1] = true;

        setEnabledMask(mask(modules.length, true));
        setVocabMask(mask(modules.length, true));
        setFragmentMask(fm);
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
                <GeneratorComponent is_active={is_active} joined={joined} enabledMask={enabledMask} />
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
