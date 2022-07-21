const os = require('os');
const execa = require('execa');
const fs = require('fs');
const path = require('path');

// 获取自定义port
let [, httpPort = 8000] =
  process.argv
    .slice(2)
    .join(' ')
    .match(/-p\s*(\d+)/) || [];

function getFrpcName() {
  return os.userInfo().username;
}

function configFrpc() {
  const username = getFrpcName();
  fs.writeFileSync(
    path.join(__dirname, 'bin/frp/frpc.ini'),
    fs
      .readFileSync(path.join(__dirname, 'bin/frp/frpc.template.ini'))
      .toString()
      .replace(/\$\{name\}/g, username)
      .replace(/\$\{port\}/g, httpPort),
  );

  execa('./bin/frp/frpc', ['-c', './bin/frp/frpc.ini'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  execa(`./node_modules/next/dist/bin/next`, ['dev', '-p', httpPort], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
}

configFrpc();
