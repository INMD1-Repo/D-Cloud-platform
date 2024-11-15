const path = require("path");

module.exports = {
    // 시작점이 될 index 페이지의 경로를 지정 (codeigniter의 view 디렉터리)
  indexPath: path.resolve(__dirname, "../app/Views/frontend/index.html"),
  // css, js등 정적파일들의 경로 (codeigniter의 정적 디렉터리여야 해서)
  outputDir: path.resolve(__dirname, "../active/frontend"),
  publicPath: "../active/frontend/",
};