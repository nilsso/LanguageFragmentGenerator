import React, { useState } from "react";
import {
    Badge, Button, ButtonGroup, Card, Col, ListGroup, Popover, OverlayTrigger, Tooltip
} from "react-bootstrap";

import { LangModule } from "../LangModule";

export function GeneratorComponent(props: {
    joined: LangModule;
    enabledMask: Array<boolean>;
}) {
    const joined = props.joined;

    const enabledMask = props.enabledMask;

    const [generated, setGenerated] = useState("...");
    const [meaning, setMeaning] = useState("");
    const [hidden, setHidden] = useState("...");
    const [swap, setSwap] = useState(false);

    const some_enabled = () => enabledMask.some((e: boolean) => e);

    const help = (
        <Popover
            id="help-popover"
        >
            <Popover.Title as="h3">Language Fragment Generator</Popover.Title>
            <Popover.Content>
                <p>
                    Language modules are like individual lessons of a language class, where each module contains a list of <strong>fragments</strong> and <strong>vocabulary</strong>. Under the card title <strong>Modules</strong> is the list of available language modules, each with an <Badge variant="primary">Enable</Badge> button to enable the module, a <Badge variant="secondary">Fragments</Badge> button to enable the fragments of that module, and a <Badge variant="secondary">Vocabulary</Badge> button to enable the vocabulary of that module. The <Badge variant="primary">All</Badge> button will enable all of the modules, and the <Badge variant="danger">None</Badge> button will disable them all.
                </p>
                <p>
                    Fragments can be entire sentences, or can contain <strong>placeholders</strong> that will be substituted upon generation. For example, a fragment containing the <code>{"{{noun}}"}</code> placeholder would have a random noun inserted where the placeholder is.
                </p>
                <p>
                    With one or more modules <strong>enabled</strong>, clicking the <Badge variant="primary">Generate</Badge> button generates a <strong>populated</strong> fragment by first randomly selecting a fragment from any of the modules with fragments enabled, and then populating the fragment with randomly selected vocabulary from any of the language modules with vocabulary enabled.
                </p>
                <p>
                    Clicking the <Badge variant="success">Reveal</Badge> button will show the meaning of what was generated, and toggling on the <Badge variant="secondary">Swap</Badge> button will instead first display the meaning so that revealing will show the populated fragment second.
                </p>
            </Popover.Content>
        </Popover>
    );

    const disabled = (
        <Tooltip
            id="generator-buttons-tooltip"
            className="tooltip-danger"
        >
            Enable at least one module
        </Tooltip>
    );

    const onClickHandler = () => {
        let [generated, meaning] = joined.random();
        if (generated) {
            [generated, meaning] = swap ? [meaning, generated] : [generated, meaning];
            setHidden("...");
            setGenerated(generated);
            setMeaning(meaning);
        }
    };

    return (
        <Col className="component">
            <Card>
                <Card.Header>
                    <span>Generator</span>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={help}>
                        <Button variant="info">Help</Button>
                    </OverlayTrigger>
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h4>{generated}</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>{hidden}</h4>
                    </ListGroup.Item>
                    <OverlayTrigger
                        placement="top"
                        show={!some_enabled()}
                        overlay={disabled}
                    >
                        <ButtonGroup id="generator-buttons">
                            <Button
                                disabled={!some_enabled()}
                                onKeyPress={onClickHandler}
                                onClick={onClickHandler}
                            >
                                Generate
                            </Button>
                            <Button
                                variant="success"
                                onClick={() => setHidden(meaning)}
                            >
                                Reveal
                            </Button>
                            <Button
                                active={swap}
                                variant="outline-secondary"
                                disabled={!some_enabled()}
                                onClick={() => setSwap(!swap)}
                            >
                                Swap
                            </Button>
                        </ButtonGroup>
                    </OverlayTrigger>
                </ListGroup>
            </Card>
        </Col>
    );
}
