import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
  Badge,
} from "react-bootstrap";
import Image from "next/image";

interface DateColor {
  [key: string]: string;
}

interface ColorName {
  name: string;
  color: string;
}

interface ColorNameDetail extends ColorName {
  link: string;
  text: {
    [key: string]: ColorName[];
  };
}

interface ColorNameDetails {
  [key: string]: ColorNameDetail;
}

export default function Home() {
  const [dateColor, setDateColor] = useState<DateColor>();
  const [colorNameDetails, setColorNameDetails] = useState<ColorNameDetails>();
  const [year, setYear] = useState<string>("1950");
  const [month, setMonth] = useState<string>("01");
  const [day, setDay] = useState<string>("01");
  const [result, setResult] = useState<ColorNameDetail>();
  const [validateInvalid, setValidateInvalid] = useState(false);

  useEffect(() => {
    (async () => {
      const _dateColor = await (await fetch("/dateColor.json")).json();
      setDateColor(_dateColor);

      const _colorNameDetails = await (
        await fetch("/colorNameDetails.json")
      ).json();
      setColorNameDetails(_colorNameDetails);
    })();
  }, []);

  useEffect(() => {
    const yearN = Number(year);
    const monthN = Number(month);
    const dayN = Number(day);

    const date = new Date(yearN, monthN - 1, dayN);

    if (
      yearN === date.getFullYear() &&
      monthN === date.getMonth() + 1 &&
      dayN === date.getDate()
    ) {
      setValidateInvalid(false);
    } else {
      setValidateInvalid(true);
    }
  }, [year, month, day]);

  function checkResult() {
    const date = `${year}-${month}-${day}`;
    const color = dateColor[date];
    const colorNameDetail = colorNameDetails[color];
    setResult(colorNameDetail);
  }

  return (
    <>
      <Head>
        <title>陰陽五行論に基づいた生年月日という小宇宙の神秘</title>
      </Head>

      <Container>
        <Row className="text-center my-5">
          <Col>
            <h1 className="font-weight-bold">お財布ラッキーカラー鑑定</h1>
            <h2 className="font-weight-bold h4">
              陰陽五行論に基づいた生年月日という小宇宙の神秘
            </h2>
          </Col>
        </Row>

        <Row className="text-center my-5">
          <Col>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Control
                    as="select"
                    custom
                    size="lg"
                    required
                    value={year}
                    onChange={(event) => {
                      setYear(event.target.value);
                    }}
                  >
                    {[...Array(56)].map((_, index) => (
                      <option key={index}>{1950 + index}</option>
                    ))}
                  </Form.Control>
                </Col>

                <Col>
                  <Form.Control
                    as="select"
                    custom
                    size="lg"
                    required
                    value={month}
                    onChange={(event) => {
                      setMonth(event.target.value);
                    }}
                  >
                    {[...Array(12)].map((_, index) => (
                      <option key={index}>
                        {(1 + index).toString().padStart(2, "0")}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                <Col>
                  <Form.Control
                    as="select"
                    custom
                    size="lg"
                    required
                    value={day}
                    onChange={(event) => {
                      setDay(event.target.value);
                    }}
                  >
                    {[...Array(31)].map((_, index) => (
                      <option key={index}>
                        {(1 + index).toString().padStart(2, "0")}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                <Col xs={12} md="auto" className="py-2 py-md-0">
                  <Button
                    variant="primary"
                    type="button"
                    size="lg"
                    block
                    onClick={checkResult}
                    disabled={validateInvalid}
                  >
                    鑑定する
                  </Button>
                </Col>

                {validateInvalid && (
                  <Col xs={12} className="text-md-left">
                    <Form.Control.Feedback type="invalid" className="d-block">
                      日付が存在しません
                    </Form.Control.Feedback>
                  </Col>
                )}
              </Form.Row>
            </Form>
          </Col>
        </Row>

        {result && (
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title
                    className="font-weight-bold"
                    style={{ color: result.color }}
                  >
                    {result.name}
                  </Card.Title>
                  <Card.Subtitle className="font-weight-bold">
                    あなたのカラー
                  </Card.Subtitle>
                </Card.Body>
                <ListGroup variant="flush">
                  {Object.entries(result.text).map(
                    ([textKey, textValue], textKeyValueIndex) => (
                      <ListGroup.Item key={textKeyValueIndex}>
                        <span className="mr-2">{textKey}:</span>
                        {textValue.map((colorName, colorNameIndex) => (
                          <Badge
                            className={`mx-1 border ${
                              colorName.color === "#ffffff" ||
                              colorName.color === "#ffff00"
                                ? "text-dark"
                                : "text-light"
                            }`}
                            key={colorNameIndex}
                            style={{
                              backgroundColor: colorName.color,
                            }}
                          >
                            {colorName.name}
                          </Badge>
                        ))}
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
                <Card.Body>
                  <Button
                    href={result.link}
                    variant="secondary"
                    block
                    target="_blank"
                  >
                    ショップをみる
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <Container>
        <Row className="text-center my-5">
          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src="/pop1.png"
                width="679"
                height="960"
                className="rounded"
              ></Image>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
