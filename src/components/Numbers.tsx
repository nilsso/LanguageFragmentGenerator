import React, { useState } from "react";
import { Button, ButtonGroup, Card, Container, Form, ListGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

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

const kanji: Array<string> = [
    // Ten thousands
    /* 90000 */ "九万",
    /* 80000 */ "八万",
    /* 70000 */ "七万",
    /* 60000 */ "六万",
    /* 50000 */ "五万",
    /* 40000 */ "四万",
    /* 30000 */ "三万",
    /* 20000 */ "二万",
    /* 10000 */ "一万",
    // Thousands
    /*  9000 */ "九千",
    /*  8000 */ "八千",
    /*  7000 */ "七千",
    /*  6000 */ "六千",
    /*  5000 */ "五千",
    /*  4000 */ "四千",
    /*  3000 */ "三千",
    /*  2000 */ "二千",
    /*  1000 */ "千",
    // Hundreds
    /*   900 */ "九百",
    /*   800 */ "八百",
    /*   700 */ "七百",
    /*   600 */ "六百",
    /*   500 */ "五百",
    /*   400 */ "四百",
    /*   300 */ "三百",
    /*   200 */ "二百",
    /*   100 */ "百",
    // Tens
    /*    90 */ "九十",
    /*    80 */ "八十",
    /*    70 */ "七十",
    /*    60 */ "六十",
    /*    50 */ "五十",
    /*    40 */ "四十",
    /*    30 */ "三十",
    /*    20 */ "二十",
    /*    10 */ "十",
    // Ones
    "九", "八", "七", "六", "五", "四", "三", "二", "一",
    "ゼロ"
];

const random = (bound: number): number => {
    return Math.floor(Math.random() * bound)
};

const translateNumber = (n: number, list: Array<string>): string => {
    if (n === 0) return list[list.length - 1];
    let res = "";
    values.forEach((v, i) => {
        while (n >= v) {
            res += list[i];
            n -= v;
        }
    });
    return res;
};

export function Numbers() {
    const [power, setPower] = useState(2);
    const [bound, setBound] = useState(10**power - 1);
    const [listIndex, setListIndex] = useState(1);
    const [generated, setGenerated] = useState("");
    const [translated, setTranslated] = useState("");
    const [swap, setSwap] = useState(false);
    const [a, setA] = useState("...");
    const [b, setB] = useState("...");

    const getList = (): Array<string> | null => {
        switch (listIndex) {
            case 1: {
                return kana;
            }
            case 2: {
                return kanji;
            }
            default: {
                return null;
            }
        }
    }

    const generate = () => {
        let n = random(bound + 1);
        let generated = String(n);
        let list = getList();
        if (list) {
            let translated = translateNumber(n, list);

            setGenerated(generated);
            setTranslated(translated);

            setA(!swap ? translated : generated);
            setB("...");
        }
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
                        <ToggleButtonGroup
                            className="squared-buttons"
                            type="radio"
                            name="list"
                            value={listIndex}
                            onChange={i => setListIndex(i)}
                            defaultValue={1}
                        >
                            <ToggleButton variant="outline-secondary" value={1}>かな</ToggleButton>
                            <ToggleButton variant="outline-secondary" value={2}>漢字</ToggleButton>
                        </ToggleButtonGroup>
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
