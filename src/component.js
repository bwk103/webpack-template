export default (text = "This is a test") => {
  const element = document.createElement("div");

  element.innerHTML = text;
  return element;
};
