const fs = require('fs');
const path = require('path');
const sass = require('A://Node/node_modules/sass');

// 设置要遍历的文件夹路径
const inputDir = path.join(__dirname, '../.scss/');
const outputDir = path.join(__dirname, '../css/');
// 如果输出目录不存在，则创建它
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 递归遍历目录中的所有 .scss 文件
function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 如果是目录，递归遍历
      traverseDirectory(filePath);
    } else if (file.endsWith('.scss')) {
      // 如果是 .scss 文件，处理它
      const relativePath = path.relative(inputDir, filePath); // 计算相对路径
      const outputFilePath = path.join(outputDir, relativePath.replace('.scss', '.css'));

      // 确保输出文件的目录存在
      const outputDirPath = path.dirname(outputFilePath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      // 编译 SCSS 文件
      sass.render({
        file: filePath,
      }, (err, result) => {
        if (err) {
          console.error(`Error compiling ${file}:`, err);
          return;
        }

        // 将编译后的 CSS 保存到输出文件夹
        fs.writeFileSync(outputFilePath, result.css);
        console.log(`${file} -> ${outputFilePath}`);
      });
    }
  });
}

// 从根目录开始递归遍历
traverseDirectory(inputDir);