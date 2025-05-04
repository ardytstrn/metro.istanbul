/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: ["./src"],
  out: "docs",
  plugin: ["typedoc-material-theme"],
  categorizeByGroup: true,
  defaultCategory: "Others",
  navigation: {
    includeCategories: true,
    includeGroups: true,
  },
};

export default config;
