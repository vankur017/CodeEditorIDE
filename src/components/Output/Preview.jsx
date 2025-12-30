
import { useSelector } from "react-redux";

const Preview = () => {

  const { html = "", css = "", js = "" } = useSelector((state) => state.code) || {};

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          const handleLog = (type, args) => {
            window.parent.postMessage({ 
              type, 
              message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ') 
            }, '*');
          };
          console.log = (...args) => handleLog('log', args);
          console.error = (...args) => handleLog('error', args);
          window.onerror = (err) => handleLog('error', [err]);
        </script>
        <script>${js}</script>
      </body>
    </html>
  `;

  return (
    <iframe
      srcDoc={srcDoc}
      title="output"
      sandbox="allow-scripts"
      className="w-full h-full border-none bg-white"
    />
  );
};

export default Preview;