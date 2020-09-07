import React from "react";
import { Accordion, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

export function VocabularyListComponent(props: any) {
    const lang_module = props.lang_module;

    const token_rows = function(choices: Array<[string, string]>) {
        return choices.map(([vocab, meaning], i) => {
            return (
                <Row key={i}>
                    <Col>{vocab}</Col>
                    <Col>{meaning}</Col>
                </Row>
            );
        });
    }

    const vocabulary_rows = Object.entries(lang_module.vocabulary).map(([token, choices]: any, i) => {
        return (
            <React.Fragment key={i}>
                <ListGroup.Item variant="secondary" className="vocabulary-header">{token}</ListGroup.Item>
                <ListGroup.Item>
                    <Container>
                        {token_rows(choices)}
                    </Container>
                </ListGroup.Item>
            </React.Fragment>
        );
    });

    return (
        <React.Fragment>
            <Accordion.Toggle
                as={Card.Header}
                className="small content-header"
                variant="link"
                eventKey="1"
            >
    View Vocabulary
</Accordion.Toggle>
<Accordion.Collapse eventKey="1">
    <Card.Body>
        <Card className="content">
            <ListGroup variant="flush">
        {vocabulary_rows}
    </ListGroup>
</Card>
                </Card.Body>
            </Accordion.Collapse>
        </React.Fragment>
    );
}

