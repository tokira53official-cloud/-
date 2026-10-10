const copyButton = document.querySelector('#copy');
copyButton?.addEventListener('click', async () => {
  const text = 'python3 -m pip install -r requirements.txt\npython3 -m py_compile bot.py\npython3 bot.py';
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = 'Copied ✓';
    setTimeout(() => copyButton.textContent = 'Copy install steps', 1800);
  } catch {
    copyButton.textContent = 'Copy not supported';
  }
});
