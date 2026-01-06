import { router } from "../Router/Routes";

export const navigate = (path) => {
  if (window.location.pathname !== path) {
    router.navigate(path);
  }
};