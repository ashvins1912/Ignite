import makePlugin from 'markdown-it-regexp';

const value = makePlugin(/%% [\d]+ %%/, match => {
  const value = match[0].split(' ')[1];

  return `<progress class="progress" value="${value}" max="100">${value}%</progress>`;
});

const valueOptions = makePlugin(/%% [\d]+ is-[\S]+ [\S ]+ %%/, match => {
  const [, value, ...options] = match[0].split(' ');
  const classList = [];

  // Don't care about the last %%
  options.pop();

  while (options[0] && options[0].includes('is-')) {
    classList.push(options.shift());
  }

  return `
    <div class="progress-with-message">
      <progress class="progress ${classList.join(
        ' '
      )}" value="${value}" max="100">
        ${value}%
      </progress>
      <span class="progress-message">${options.join(' ')}</span>
    </div>
  `;
});

export default function bulmaProgress(md) {
  md.use(value);
  md.use(valueOptions);
}
