import React from "react";
import MarkdownRender from "../components/MarkdownRender";
import Card from "../components/Card";
import { getContentData } from "../utils/contents";

export default function Dokument({ contents }) {
  return (
    <div id="contentbody">
      <h1 id="page-title">Dokument</h1>
      <h2>Praxisdokment</h2>
      <p>
        Har som syfte att samla viktig information som inte passar in i något av sektionens
        styrdokument. Notera att dessa är levande dokument.
      </p>
      <div className="cards praxis-cards">
        <Card link={"/praxis/alkoholservering"}>
          <i className="fa-solid fa-martini-glass" /> Rutiner för <b>alkoholservering</b>
        </Card>
        <Card link={"/praxis/lokalbokning"}>
          <i className="fa-solid fa-house" /> Praxis för <b>lokalbokning</b>
        </Card>
        <Card link={"/praxis/personuppgifter"}>
          <i className="fa-solid fa-address-card" /> Hantering av <b>personuppgifter</b>
        </Card>
        <Card link={"/praxis/utlagg"}>
          <i className="fa-solid fa-file-invoice-dollar" /> Praxis för <b>utlägg</b>
        </Card>
      </div>

      <h2>Blanketter, mallar och lathundar</h2>
      <div className="cards">
        <Card link={"https://drive.google.com/file/d/1rOzE5IwIRqV0D89qd5f0i-CnTebz8Y3h/view"}>
          <i className="fa-regular fa-file-pdf" /> Utläggsblankett
        </Card>
        <Card
          link={
            "https://docs.google.com/document/d/1BxySegqiWihlavewTlbLEPKaY3XAOuSA7fJPdoS-U-w/edit?usp=sharing"
          }>
          <i className="fa-regular fa-file-pdf" /> Mall för digitalt signerat kvitto
        </Card>
        <Card
          link={
            "https://docs.google.com/document/d/1cqWZFaQ8CyRdVJ8qTxTLiFinnVLjPE0QKf3rvVIx6BA/edit?usp=sharing"
          }>
          <i className="fa-regular fa-file-pdf" /> Mall för handsignerat kvitto
        </Card>
        <Card link={"https://drive.google.com/file/d/1aBCjU8wfLI5NwNNPjf-RabC1G4ZxM-wn/view"}>
          <i className="fa-regular fa-file-pdf" /> Milersättningsblankett
        </Card>
        <Card
          link={"https://docs.google.com/document/d/1R9VzViVigsH3GzNqoHZJUYT3qf6Nw878BST8yCr3Dik"}>
          <i className="fa-regular fa-file-lines" /> Mall för entledigande
        </Card>
        <Card
          link={"https://docs.google.com/document/d/17srFoYElH16ysq_xeu_jlue3W4cxYeJsYgRA2FRWLus"}>
          <i className="fa-regular fa-file-lines" /> Mall för motion
        </Card>
        <Card
          link={"https://docs.google.com/document/d/1-LNWlpYvrYVFwJ9H9fZZO4-a9XAB8KLULQGBnuCX8pQ"}>
          <i className="fa-regular fa-file-lines" /> Mall för äskan
        </Card>
        <Card link={"https://docs.google.com/document/d/1iKTCjjld17XxJUKBo9cWCmr1A_vmsATD"}>
          <i className="fa-regular fa-file-pdf" /> CL:s SM-ord
        </Card>
        <Card
          link={
            "https://docs.google.com/document/d/1xvkaImZgTlshVRRpyNc31_lrnB1qrEwMHUgF8ei21fs/edit?usp=sharing"
          }>
          <i className="fa-regular fa-file-pdf" /> Rapportmall SM
        </Card>
        <Card
          link={
            "https://docs.google.com/forms/d/159D-EqMxWraoC8ZdaXySFzg9B8hOQlhARkTLUu28830/edit"
          }>
          <i className="fa-solid fa-square-poll-horizontal" /> Formulärsmall
        </Card>
      </div>
      <h2>Styrdokument</h2>
      <iframe
        src="https://drive.google.com/embeddedfolderview?id=1Nwg-S7C0YZ0FAeoQtQoQs2NpAcB9Jacb#grid"
        style={{
          width: "100%",
          height: "600px",
          border: "0",
          backgroundColor: "#F2F3F4",
        }}></iframe>
      <br />
      <h2>
        Protokoll och handlingar från <a href="#rättigheter">SM och StyM</a>
      </h2>
      <iframe
        src="https://drive.google.com/embeddedfolderview?id=1TNcYNzvTLvmr-IKdY9TG6rW_0h-QFVGX#grid"
        style={{
          width: "100%",
          height: "600px",
          border: "0",
          backgroundColor: "#F2F3F4",
        }}></iframe>
      <section id="rättigheter">
        <MarkdownRender mdData={contents["rattigheter"]} />
      </section>
    </div>
  );
}

export async function getStaticProps() {
  let contents = getContentData("dokument");
  return {
    props: {
      contents,
    },
  };
}
