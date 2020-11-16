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
import dateColor from "../public/dateColor.json";
import colorNameDetails from "../public/colorNameDetails.json";

interface DateColor {
  [key: string]: string;
}

interface ColorName {
  name: string;
  color: string;
}

interface ColorNameDetail extends ColorName {
  link: string;
  description: string;
  image: string;
  text: {
    [key: string]: ColorName[];
  };
}

interface ColorNameDetails {
  [key: string]: ColorNameDetail;
}

export default function Home() {
  const [year, setYear] = useState<string>("1950");
  const [month, setMonth] = useState<string>("01");
  const [day, setDay] = useState<string>("01");
  const [result, setResult] = useState<ColorNameDetail>();
  const [validateInvalid, setValidateInvalid] = useState(false);

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
        <title>お財布ラッキーカラー鑑定</title>
      </Head>

      <Container>
        <Row className="text-center my-5">
          <Col>
            <div
              className="mb-5"
              style={{
                display: "flex",
                justifyContent: "center",
                // width: 100,
                // marginBottom: 100,
              }}
            >
              <Image
                src="/header.png"
                width="100"
                height={(100 / 860) * 836}
                // className="rounded"
                style={{}}
              ></Image>
            </div>
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
          <Row className="my-5">
            <Col>
              <Card>
                <Card.Img variant="top" src={result.image} />
                <Card.Body>
                  <Card.Subtitle
                    className="font-weight-bold"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {result.description}
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
                    {result.name} の方にぴったりのお財布の色はこちら
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
