export default (text = "Something else") => {
  const element = document.createElement("div");

  element.innerHTML = text;
  return element;
};
