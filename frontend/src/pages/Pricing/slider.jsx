import React from "react";
import { Link } from "react-router-dom";

import "./pricing.style.scss";
import { data } from "./data";
import conatctLocatonIconStar from "../../assets/svgs/Conatct-locaton-icon-star.svg";

function Slider({ value, disabledHandler, per, access }) {
  return (
    <section className="plansContainer" id="slider">
      {data[value].subscription.map(item => {
        const { id, sub } = item;
        return (
          <div className={sub.subType} key={id}>
            {sub.subType === "Standard" ? (
              <div
                style={{
                  gap: "16px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem"
                }}
              >
                <h4>{sub.subType}</h4>
                <div
                  style={{
                    gap: "6px",
                    display: "flex",
                    padding: "6px 16px",
                    borderRadius: "12px",
                    alignItems: "center",
                    backgroundColor: "#08372F1A"
                  }}
                >
                  <p style={{ fontSize: "12px" }}>Recommended</p>
                  <img
                    style={{ width: "13px" }}
                    src={conatctLocatonIconStar}
                    alt="Conatct-locaton-icon-star"
                  />
                </div>
              </div>
            ) : (
              <h4 style={{ marginBottom: "0.5rem" }}>{sub.subType}</h4>
            )}

            <p>{sub.header}</p>

            <h3 style={{ paddingTop: "0.8rem", paddingBottom: "0.8rem" }}>
              {sub.amount}
              <span>{per}</span>
            </h3>

            <p>{sub.text}</p>

            <article>
              {sub.subText.map(item => {
                const { id, img, txt } = item;
                return (
                  <div className="others" key={id}>
                    <img src={img} alt={txt} />
                    <span>{txt}</span>
                  </div>
                );
              })}
            </article>

            {access ? (
              <Link
                to={`${sub.subType !== "Basic" ? "" : ""}`}
                style={sub.subType === "Basic" ? { display: "none" } : {}}
                onClick={e =>
                  disabledHandler(
                    e,
                    sub.subType,
                    sub.amount,
                    per,
                    sub.header,
                    sub.text,
                    sub.subText
                  )
                }
              >
                {sub.linkText}
              </Link>
            ) : (
              <Link to={sub.linkTo}>{sub.linkText}</Link>
            )}
          </div>
        );
      })}
    </section>
  );
}

export default Slider;
