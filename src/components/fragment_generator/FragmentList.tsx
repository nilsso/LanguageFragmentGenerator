import React from "react";
import { Container, Accordion, Card, Row, Col } from "react-bootstrap";

import { Fragment } from "../../LangModule";

export function FragmentListComponent(props: any) {
    const lang_module = props.lang_module;

    const rows = lang_module.fragments.map((f: Fragment, i: number) => {
        return (
            <Row key={i}>
                <Col>{f.fragment_template}</Col>
                <Col>{f.meaning_template}</Col>
            </Row>
        );
    });

    return (
        <React.Fragment>
            <Accordion.Toggle
                as={Card.Header}
                className="small content-header"
                variant="link"
                eventKey="0"
            >
                View Fragments
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Card className="content">
                        <Container fluid>
                            {rows}
                        </Container>
                    </Card>
                </Card.Body>
            </Accordion.Collapse>
        </React.Fragment>
    );
}

