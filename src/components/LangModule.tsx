import React from "react";

import { LangModule } from "../LangModule";
import { Accordion, Card, ButtonGroup, ToggleButton } from "react-bootstrap";
import { FragmentListComponent } from "./FragmentList";
import { VocabularyListComponent } from "./VocabularyList";

export function LangModuleComponent(
    //props: any
    props: {
        lang_module: LangModule;

        enabledFlag: boolean;
        setEnabledFlag: (checked: boolean) => void;

        fragmentFlag: boolean;
        setFragmentFlag: (checked: boolean) => void;

        vocabFlag: boolean;
        setVocabFlag: (checked: boolean) => void;
    }
) {
    // Modules state
    const lang_module = props.lang_module;
    // Mask states
    const [enabledFlag, setEnabledFlag] = [props.enabledFlag, props.setEnabledFlag];
    const [fragmentFlag, setFragmentFlag] = [props.fragmentFlag, props.setFragmentFlag];
    const [vocabFlag, setVocabFlag] = [props.vocabFlag, props.setVocabFlag];

    console.log(typeof (setEnabledFlag));

    const has_fragments = !!fragmentFlag;
    const has_vocabulary = !!vocabFlag;

    return (
        <Accordion className="module">
            <Card>
                <Card.Header>
                    {lang_module.name}
                </Card.Header>
                <Card.Body id="module-control">
                    <ButtonGroup
                        toggle className="module-controls"
                    >
                        <ToggleButton
                            type="checkbox"
                            variant="outline-primary"
                            size="sm"
                            value={0}
        checked={enabledFlag}
        onChange={(e) => setEnabledFlag(e.currentTarget.checked)}
    >
        Enable
    </ToggleButton>
    <ToggleButton
        type="checkbox"
        variant="outline-secondary"
        size="sm"
        value={1}
        checked={fragmentFlag}
        disabled={has_fragments && !enabledFlag}
        onChange={(e) => setFragmentFlag(e.currentTarget.checked)}
    >
        Fragments
    </ToggleButton>
    <ToggleButton
        type="checkbox"
        variant="outline-secondary"
        size="sm"
        value={2}
        checked={vocabFlag}
        disabled={has_vocabulary && !enabledFlag}
        onChange={(e) => setVocabFlag(e.currentTarget.checked)}
    >
        Vocabulary
    </ToggleButton>
</ButtonGroup>
                </Card.Body>
            </Card>
            <Card>
                <FragmentListComponent lang_module={lang_module} />
                <VocabularyListComponent lang_module={lang_module} />
            </Card>
        </Accordion>
    );
}

