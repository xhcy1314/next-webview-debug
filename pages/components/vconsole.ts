import { useEffect } from 'react';

export default function Vconsole() {
  useEffect(() => {
    if (typeof window === 'undefined') return () => {};
    const VConsole = require('vconsole');
    new VConsole();
  }, []);
  return null;
}
