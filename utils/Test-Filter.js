export function tags(tags, testName) {
  return `${testName} ${tags.join(" ")}`;
}

export const tagName = {
  PERFORMACE: "@performace",
  BACKEND: "@backend",
  FUNTIONAL: "@functional",
  UI: "@ui",
};

export function envToTag(tagString) {
  const tagArray = tagString.split(",");
  return tagArray.map((tagName) => new RegExp(`@${tagName}`));
}
