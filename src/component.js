export default (text = "Something else") => {
  const element = document.createElement("div");
  element.className = "pure-button";
  element.innerHTML = text;
  return element;
};
