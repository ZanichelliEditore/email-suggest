// Vite's entry (make consumer-check): `vite build` must resolve the package
// installed from Gemfury and bundle it. The bundle is not run (T-013).
import { suggest } from "@zanichelli/email-suggest";

document.querySelector("#out").textContent = JSON.stringify(
  suggest("mario@lgmai.com"),
);
