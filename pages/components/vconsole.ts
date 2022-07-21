import { useEffect } from 'react';
import VConsole from 'vconsole';

const envPlugin = new VConsole.VConsolePlugin('tip_tool', '切换环境');

const html = '<div>请点击下方按钮，切换测试/正式环境</div>';
envPlugin.on('renderTab', (callback) => {
    callback(html);
});

envPlugin.on('addTool', (callback) => {
    const toolList = [];
    toolList.push({
      name: '测试环境',
      global: false,
      onClick() {
        console.log('已切换为测试CGI，即将刷新页面......');
        window.sessionStorage.setItem('tip_debug_cgi_env', 'test');
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
});
toolList.push({
      name: '现网环境',
      global: false,
      onClick() {
        console.log('已切换为正式CGI，即将刷新页面......');
        window.sessionStorage.setItem('tip_debug_cgi_env', 'prod');
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
    });
    callback(toolList);
});

export default function Vconsole() {
  useEffect(() => {
    const vConsole = new VConsole();
    vConsole.addPlugin(envPlugin);
  }, []);
  return null;
}
