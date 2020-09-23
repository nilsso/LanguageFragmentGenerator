import React, { useState, Dispatch, SetStateAction } from "react";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";

export function SourceComponent(props: { source: string, setSource: Dispatch<SetStateAction<string>> }) {
    const [source, setSource] = [props.source, props.setSource];

    const [value, setValue] = useState(source);

    return (
        <Row>
            <Col className="component">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            Module Source
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        defaultValue={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={() => setSource(value)}
                        >
                            Load
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        </Row>
    );
}

