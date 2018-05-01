export default (text = "Something else") => {
  const element = document.createElement("div");
  element.className = "pure-button";
  element.innerHTML = text;

  element.onclick = () => {
    import('./lazy')
      .then(lazy => {
        element.textContent = lazy.default;
      })
      .catch(err => {
        console.log(err);
      });
  }
  return element;
};
