var process = require('child_process');
//直接调用命令
exports.gulpFile = function (){ process.exec('gulp',
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
}