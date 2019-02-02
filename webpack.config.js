if (process.env.NODE_ENV === "test") {
  module.exports.externals = [require("webpack-node-externals")()];
  module.exports.devtool = "eval";
}
