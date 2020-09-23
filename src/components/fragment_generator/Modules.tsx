import React, { Dispatch, SetStateAction } from "react";
import { Button, Card, Col, ListGroup } from "react-bootstrap";

import { mask, toggle_mask } from "../../util";
import { LangModule } from "../../LangModule";
import { LangModuleComponent } from "./LangModule";

export function ModulesComponent(props: {
    modules: Array<LangModule>;

    enabledMask: Array<boolean>;
    setEnabledMask: Dispatch<SetStateAction<Array<boolean>>>;

    fragmentMask: Array<boolean>;
    setFragmentMask: Dispatch<SetStateAction<Array<boolean>>>;

    vocabMask: Array<boolean>;
    setVocabMask: Dispatch<SetStateAction<Array<boolean>>>;
}) {
    // Modules state
    const modules = props.modules;
    // Mask states
    const [enabledMask, setEnabledMask] = [props.enabledMask, props.setEnabledMask];
    const [fragmentMask, setFragmentMask] = [props.fragmentMask, props.setFragmentMask];
    const [vocabMask, setVocabMask] = [props.vocabMask, props.setVocabMask];

    // Helper to toggle all modules
    const toggleAll = function(checked: boolean) {
        setEnabledMask(mask(modules.length, checked));
    }

    let module_components = modules.map((lang_module: LangModule, i: number) => {
        return <LangModuleComponent
            key={i}
            lang_module={lang_module}

            enabledFlag={enabledMask[i]}
            setEnabledFlag={(checked: boolean) => setEnabledMask(toggle_mask(enabledMask, i, checked))}

            setFragmentFlag={(checked: boolean) => setFragmentMask(toggle_mask(fragmentMask, i, checked))}
            fragmentFlag={fragmentMask[i]}

            vocabFlag={vocabMask[i]}
            setVocabFlag={(checked: boolean) => setVocabMask(toggle_mask(vocabMask, i, checked))}
        />;
    });

    return (
        <Col className="component">
            <Card>
                <Card.Header>
                    <span>Modules</span>
                    <Button
                        variant="primary"
                        onClick={() => toggleAll(true)}
                    >
                        All
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => toggleAll(false)}
                    >
                        None
                    </Button>
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div id="module-list">{module_components}</div>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    );
}

