(() => {
  const source = window.AGENT_SUITES || { catalog: [], suites: {} };
  const state = { catalog: source.catalog || [], suites: new Map(), query: '', active: null };
  const $ = (selector) => document.querySelector(selector);
  const grid = $('#suite-grid'), modal = $('#suite-modal');
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[c]));
  const normalize = (value) => String(value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const basePath = (suite, path) => `agent-suites/${suite.id}/${path}`;
  const markdown = (value) => {
    const lines = String(value || '').replaceAll('\r\n', '\n').split('\n');
    const out = []; let paragraph = []; let code = false; let codeLines = [];
    const inline = (text) => escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    const flush = () => { if (paragraph.length) { out.push(`<p>${inline(paragraph.join(' '))}</p>`); paragraph = []; } };
    for (const line of lines) {
      if (line.trim().startsWith('```')) { if (code) { out.push(`<pre>${escapeHtml(codeLines.join('\n'))}</pre>`); codeLines = []; } else flush(); code = !code; continue; }
      if (code) { codeLines.push(line); continue; }
      if (!line.trim()) { flush(); continue; }
      const heading = line.match(/^(#{1,3})\s+(.+)$/); if (heading) { flush(); out.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`); continue; }
      const bullet = line.match(/^\s*[-*]\s+(.+)$/); if (bullet) { flush(); out.push(`<li>${inline(bullet[1])}</li>`); continue; }
      paragraph.push(line.trim());
    }
    flush(); return out.join('');
  };
  const filtered = () => { const query = normalize(state.query.trim()); return state.catalog.filter((suite) => !query || normalize([suite.name, suite.summary, suite.category, ...(suite.tags || []), ...(suite.capabilities || [])].join(' ')).includes(query)); };
  function render() {
    const items = filtered(); $('#suite-count').textContent = `${state.catalog.length} suite${state.catalog.length === 1 ? '' : 's'}`; $('#result-count').textContent = `${items.length} shown`;
    if (!items.length) { grid.innerHTML = '<div class="empty">Không tìm thấy agent suite phù hợp.</div>'; return; }
    grid.innerHTML = items.map((suite) => `<article class="suite-card" data-suite="${escapeHtml(suite.id)}"><div class="card-top"><span class="card-kind">${escapeHtml(suite.category)}</span><span class="version">v${escapeHtml(suite.version)}</span></div><h3>${escapeHtml(suite.name)}</h3><p>${escapeHtml(suite.summary)}</p><div class="tag-row">${(suite.tags || []).map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`).join('')}</div><div class="capability-preview">${(suite.capabilities || []).slice(0, 3).map(escapeHtml).join(' · ')}${suite.capabilities?.length > 3 ? ' · ...' : ''}</div></article>`).join('');
    grid.querySelectorAll('[data-suite]').forEach((card) => card.addEventListener('click', () => openSuite(card.dataset.suite)));
  }
  function getSuite(catalogEntry) { if (!state.suites.has(catalogEntry.id)) state.suites.set(catalogEntry.id, source.suites[catalogEntry.id]); return Promise.resolve(state.suites.get(catalogEntry.id)); }
  function getFile(suite, file) { return fetch(basePath(suite, file.path), { cache: 'no-store' }).then((response) => { if (!response.ok) throw Error(`Could not load ${file.path}`); return response.text(); }); }
  function download(name, content, type = 'text/plain') { const link = document.createElement('a'); link.href = URL.createObjectURL(content instanceof Blob ? content : new Blob([content], { type })); link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); }
  async function openSuite(id) {
    const catalogEntry = state.catalog.find((item) => item.id === id); if (!catalogEntry) return;
    try {
      const suite = await getSuite(catalogEntry); state.active = { catalog: catalogEntry, suite };
      $('#modal-title').textContent = catalogEntry.name; $('#modal-description').textContent = catalogEntry.summary; $('#agent-install-path').textContent = suite.install.agent;
      $('#capabilities').innerHTML = (catalogEntry.capabilities || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('');
      $('#file-list').innerHTML = suite.files.map((file, index) => `<div class="file-row"><div class="file-info"><span class="file-label">${escapeHtml(file.label)}</span><code class="file-path">${escapeHtml(file.path)}</code></div><div class="file-actions"><button data-view="${index}">View</button><button data-copy="${index}">Copy</button><button data-download="${index}">Download</button></div></div>`).join('');
      const readme = suite.files.find((file) => file.path === 'README.md'); const prompt = suite.files.find((file) => file.path === 'prompts/update-agent-files.md');
      const [readmeText, promptText] = await Promise.all([getFile(suite, readme), getFile(suite, prompt)]); $('#readme-content').innerHTML = markdown(readmeText); $('#update-prompt').textContent = promptText; modal.hidden = false; document.body.style.overflow = 'hidden';
      document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', async () => { const text = await getFile(suite, suite.files[Number(button.dataset.view)]); $('#update-prompt').textContent = text; document.querySelector('.prompt-panel').scrollIntoView({ behavior: 'smooth' }); }));
      document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async () => { await navigator.clipboard.writeText(await getFile(suite, suite.files[Number(button.dataset.copy)])); button.textContent = 'Copied'; setTimeout(() => { button.textContent = 'Copy'; }, 1200); }));
      document.querySelectorAll('[data-download]').forEach((button) => button.addEventListener('click', async () => { const file = suite.files[Number(button.dataset.download)]; download(file.path.split('/').pop(), await getFile(suite, file)); }));
    } catch (error) { alert(`Không thể mở suite: ${error.message}`); }
  }
  function close() { modal.hidden = true; document.body.style.overflow = ''; state.active = null; }
  const crc32 = (bytes) => { let table = crc32.table; if (!table) { table = crc32.table = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1; table[n] = c >>> 0; } } let crc = 0xffffffff; for (const byte of bytes) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8); return (crc ^ 0xffffffff) >>> 0; };
  const u16 = (view, offset, value) => view.setUint16(offset, value, true); const u32 = (view, offset, value) => view.setUint32(offset, value, true);
  function buildZip(files) {
    const encoder = new TextEncoder(); const chunks = []; const central = []; let offset = 0;
    for (const file of files) { const name = encoder.encode(file.name); const data = typeof file.content === 'string' ? encoder.encode(file.content) : file.content; const crc = crc32(data); const local = new ArrayBuffer(30 + name.length); const view = new DataView(local); u32(view,0,0x04034b50); u16(view,4,20); u16(view,6,0x0800); u16(view,8,0); u16(view,10,0); u16(view,12,0); u32(view,14,crc); u32(view,18,data.length); u32(view,22,data.length); u16(view,26,name.length); u16(view,28,0); new Uint8Array(local,30).set(name); chunks.push(new Uint8Array(local), data); const entry = new ArrayBuffer(46 + name.length); const e = new DataView(entry); u32(e,0,0x02014b50); u16(e,4,20); u16(e,6,20); u16(e,8,0x0800); u16(e,10,0); u16(e,12,0); u16(e,14,0); u32(e,16,crc); u32(e,20,data.length); u32(e,24,data.length); u16(e,28,name.length); u16(e,30,0); u16(e,32,0); u16(e,34,0); u16(e,36,0); u32(e,38,0); u32(e,42,offset); new Uint8Array(entry,46).set(name); central.push(new Uint8Array(entry)); offset += local.byteLength + data.length; }
    const centralSize = central.reduce((sum, item) => sum + item.length, 0); const end = new ArrayBuffer(22); const endView = new DataView(end); u32(endView,0,0x06054b50); u16(endView,4,0); u16(endView,6,0); u16(endView,8,files.length); u16(endView,10,files.length); u32(endView,12,centralSize); u32(endView,16,offset); u16(endView,20,0); return new Blob([...chunks, ...central, new Uint8Array(end)], { type: 'application/zip' });
  }
  async function downloadZip() { if (!state.active) return; const { catalog, suite } = state.active; const button = $('#download-zip'); button.disabled = true; button.textContent = 'Preparing ZIP...'; try { const files = []; for (const file of suite.files) files.push({ name: `${catalog.id}/${file.path}`, content: await getFile(suite, file) }); files.push({ name: `${catalog.id}/suite.json`, content: JSON.stringify(suite, null, 2) }); files.push({ name: `${catalog.id}/catalog-entry.json`, content: JSON.stringify(catalog, null, 2) }); download(`${catalog.id}.zip`, buildZip(files), 'application/zip'); } catch (error) { alert(`Không thể tạo ZIP: ${error.message}`); } finally { button.disabled = false; button.textContent = 'Download ZIP'; } }
  async function copyPrompt() { await navigator.clipboard.writeText($('#update-prompt').textContent); const button = $('#copy-update-prompt'); button.textContent = 'Copied'; setTimeout(() => { button.textContent = 'Copy update prompt'; }, 1200); }
  $('#search-input').addEventListener('input', (event) => { state.query = event.target.value; render(); }); $('#clear-btn').addEventListener('click', () => { $('#search-input').value = ''; state.query = ''; render(); }); $('#close-modal').addEventListener('click', close); modal.addEventListener('click', (event) => { if (event.target === modal) close(); }); $('#download-zip').addEventListener('click', downloadZip); $('#copy-update-prompt').addEventListener('click', copyPrompt); $('#copy-prompt-inline').addEventListener('click', copyPrompt); document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); $('#search-input').focus(); } if (event.key === 'Escape' && !modal.hidden) close(); });
  render();
})();
