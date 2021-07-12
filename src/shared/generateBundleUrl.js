const generateBundleUrl = (name) =>
  "http://localhost:3000/bundle?b=" + encodeURI(name);

export default generateBundleUrl;
