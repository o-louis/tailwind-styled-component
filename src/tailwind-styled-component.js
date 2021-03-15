import HTMLElements from "./HTMLElements";

const parseTailwindClasses = (styles, props) => {
  return styles
    .map((style, index) => {
      style = style
        .replace(/\n|\r/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();
      return `${style}${props[index] || ""}`;
    })
    .join("");
};

const renderComponent = (TagElement, classnames, props) => {
  return () => (
    <TagElement
      className={parseTailwindClasses(classnames, props)}
    ></TagElement>
  );
};

const createHTMLElements = (elements = {}) => {
  HTMLElements.forEach((TagElement) => {
    elements = {
      ...elements,
      ...{
        [TagElement]: (classnames, ...props) =>
          renderComponent(TagElement, classnames, props),
      },
    };
  });
  return elements;
};

const twd = createHTMLElements();

export default twd;
