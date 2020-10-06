import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [sourceJson, setSourceJson] = useState<{ [key: string]: string }>();
  const [date, setDate] = useState<string>("");
  const [result, setResult] = useState<string>();

  useEffect(() => {
    (async () => {
      setSourceJson(await (await fetch("/source.json")).json());
    })();
  }, []);

  function checkResult() {
    setResult(sourceJson[date]);
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div>
        <input
          type="date"
          min="1950-01-01"
          max="2005-12-31"
          required
          value={date}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setDate(event.target.value);
          }}
        />
        <button onClick={checkResult}>Check</button>
      </div>

      {result && <div>Result: {result}</div>}
    </div>
  );
}
