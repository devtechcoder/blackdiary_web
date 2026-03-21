"use client";

import React from "react";

const toArray = (children) => React.Children.toArray(children);

const getName = (child) => {
  if (!React.isValidElement(child)) return "";
  if (typeof child.type === "string") return child.type;
  return "";
};

const applyTag = (child) => {
  if (!React.isValidElement(child)) return;

  const tag = getName(child);
  const props = child.props || {};

  if (tag === "title") {
    const text = toArray(props.children).join("");
    if (text) document.title = text;
    return;
  }

  if (["meta", "link"].includes(tag)) {
    const selectorKey = props.name || props.property || props.rel || props.href;
    if (!selectorKey) return;

    const selector = Object.entries(props)
      .filter(([k, v]) => typeof v === "string" && ["name", "property", "rel", "href", "charset"].includes(k))
      .map(([k, v]) => `[${k}="${v}"]`)
      .join("");

    let el = selector ? document.head.querySelector(`${tag}${selector}`) : null;
    if (!el) {
      el = document.createElement(tag);
      document.head.appendChild(el);
    }

    Object.entries(props).forEach(([key, value]) => {
      if (key === "children" || key === "dangerouslySetInnerHTML") return;
      if (value !== undefined && value !== null) {
        el.setAttribute(key, String(value));
      }
    });
  }
};

export const HelmetProvider = ({ children }) => <>{children}</>;

export const Helmet = ({ children }) => {
  React.useEffect(() => {
    toArray(children).forEach(applyTag);
  }, [children]);

  return null;
};
