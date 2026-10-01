// make demo: the README's Usage snippet in a page. It imports the built
// dist/, so it shows what ships (T-015).
import { suggest } from "../../dist/index.js";

const input = document.querySelector("#email");
const hint = document.querySelector("#hint");

input.addEventListener("input", () => {
  const s = suggest(input.value);
  hint.replaceChildren();
  if (s) {
    // A button, not a link: clicking applies the suggestion. The user may
    // also ignore it and keep what they typed (SPEC §2).
    const apply = document.createElement("button");
    apply.type = "button";
    apply.textContent = s.address;
    apply.addEventListener("click", () => {
      input.value = s.address;
      hint.replaceChildren();
    });
    hint.append("Did you mean ", apply, "?");
  }
});
