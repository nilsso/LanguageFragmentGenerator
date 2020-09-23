import React, { useState } from "react";
import { Button, ButtonGroup, Card, Container, Form, ListGroup } from "react-bootstrap";

import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

const random = (bound: number): number => {
    return Math.floor(Math.random() * bound)
};

const values: Array<number> = [
    90000, 80000, 70000, 60000, 50000, 40000, 30000, 20000, 10000,
     9000,  8000,  7000,  6000,  5000,  4000,  3000,  2000,  1000,
      900,   800,   700,   600,   500,   400,   300,   200,   100,
       90,    80,    70,    60,    50,    40,    30,    20,    10,
        9,     8,     7,     6,     5,     4,     3,     2,     1
];

const kana: Array<string> = [
    // Ten thousands
    /* 90000 */ "きゅうまん",
    /* 80000 */ "はちまん",
    /* 70000 */ "ななまん",
    /* 60000 */ "ろくまん",
    /* 50000 */ "ごまん",
    /* 40000 */ "よんまん",
    /* 30000 */ "さんまん",
    /* 20000 */ "にまん",
    /* 10000 */ "いちまん",
    // Thousands
    /*  9000 */ "きゅうせん",
    /*  8000 */ "はっせん",
    /*  7000 */ "ななせん",
    /*  6000 */ "ろくせん",
    /*  5000 */ "ごせん",
    /*  4000 */ "よんせん",
    /*  3000 */ "さんぜん",
    /*  2000 */ "にせん",
    /*  1000 */ "せん",
    // Hundreds
    /*   900 */ "きゅうひゃく",
    /*   800 */ "はっぴゃく",
    /*   700 */ "ななひゃく",
    /*   600 */ "ろっぴゃく",
    /*   500 */ "ごひゃく",
    /*   400 */ "よんひゃく",
    /*   300 */ "さんびゃく",
    /*   200 */ "にひゃく",
    /*   100 */ "ひゃく",
    // Tens
    /*    90 */ "きゅうじゅう",
    /*    80 */ "はちじゅう",
    /*    70 */ "ななじゅう",
    /*    60 */ "ろくじゅう",
    /*    50 */ "ごじゅう",
    /*    40 */ "よんじゅう",
    /*    30 */ "さんじゅう",
    /*    20 */ "にじゅう",
    /*    10 */ "じゅう",
    // Ones
    "きゅう", "はち", "なな", "ろく", "ご", "よん", "さん", "に", "いち",
    "ゼロ"
];

const translateNumber = (n: number, list: Array<string>): string => {
    if (n === 0) {
        return list[list.length - 1];
    }
    let res = "";
    values.forEach((v, i) => {
        while (n >= v) {
            res += kana[i];
            n -= v;
        }
    });
    return res;
};

export function Numbers() {
    const [power, setPower] = useState(2);
    const [bound, setBound] = useState(10**power - 1);
    const [generated, setGenerated] = useState("");
    const [translated, setTranslated] = useState("");
    const [swap, setSwap] = useState(false);
    const [a, setA] = useState("...");
    const [b, setB] = useState("...");

    const generate = () => {
        let n = random(bound + 1);
        let generated = String(n);
        let translated = translateNumber(n, kana);
        setGenerated(generated);
        setTranslated(translated);
        setA(!swap ? translated : generated);
        setB("...");
    };

    const reveal = () => {
        setB(!swap ? generated : translated);
    };

    return (
        <Container id="numbers">
            <Card>
                <Card.Header>
                    Number Generator
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <p>{a}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>{b}</p>
                    </ListGroup.Item>
                    <ButtonGroup className="squared-buttons">
                        <Button
                            onClick={generate}
                        >
                            Generate
                        </Button>
                        <Button
                            variant="success"
                            onClick={reveal}
                        >
                            Reveal
                        </Button>
                        <Button
                            variant="outline-secondary"
                            active={swap}
                            onClick={() => setSwap(!swap)}
                        >
                            Swap
                        </Button>
                    </ButtonGroup>
                    <ListGroup.Item id="generated">
                        <Form.Group>
                            <Form.Label>From 0 to {bound}</Form.Label>
                            <RangeSlider
                                min={1}
                                max={5}
                                value={power}
                                tooltipPlacement="top"
                                tooltipLabel={() => bound}
                                onChange={
                                    (e) => {
                                        let p = Number(e.target.value);
                                        setPower(p);
                                        setBound(10**p - 1);
                                    }
                                }
                            />
                        </Form.Group>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Container>
    );
}
