const os = require('os'); // 获取系统信息
const execa = require('execa'); // 执行shell
const fs = require('fs'); // 文件系统
const path = require('path'); // 路径

// 获取自定义port
let [, httpPort = 8000] =
  process.argv
    .slice(2)
    .join(' ')
    .match(/-p\s*(\d+)/) || [];

// 获取客户端系统用户名 用来区分不同的开发 这里可以使用其他方式 只要保证唯一就可以
function getFrpcName() {
  return os.userInfo().username;
}

function configFrpc() {
  const username = getFrpcName();
  // 使用frpc.template.ini 创建我们的frpc.ini文件
  fs.writeFileSync(
    path.join(__dirname, 'bin/frp/frpc.ini'),
    fs
      .readFileSync(path.join(__dirname, 'bin/frp/frpc.template.ini'))
      .toString()
      .replace(/\$\{name\}/g, username)
      .replace(/\$\{port\}/g, httpPort),
  );

  // 启动frpc服务
  execa('./bin/frp/frpc', ['-c', './bin/frp/frpc.ini'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  // 启动next服务，这里使用了next作为演示，其他项目需要修改启动命令
  execa(`./node_modules/next/dist/bin/next`, ['dev', '-p', httpPort], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
}

configFrpc();