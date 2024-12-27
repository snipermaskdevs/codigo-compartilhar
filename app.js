// Recupera os elementos do DOM
const codeEditor = document.getElementById('codeEditor');
const saveButton = document.getElementById('saveButton');
const statusText = document.getElementById('status');
const shareLinkInput = document.getElementById('shareLink');

// Função para salvar o código e gerar o link
saveButton.addEventListener('click', () => {
  const code = codeEditor.value;
  if (code) {
    // Codifica o código para o link
    const codeId = btoa(code);
    localStorage.setItem('sharedCode', codeId);

    // Gera o link para compartilhamento
    const link = window.location.origin + window.location.pathname + '?code=' + codeId;
    shareLinkInput.value = link;

    // Exibe o status de sucesso e limpa após 3 segundos
    statusText.textContent = 'Código salvo com sucesso! Compartilhe o link.';
    statusText.style.color = 'green';
    setTimeout(() => {
      statusText.textContent = '';
    }, 3000);
  } else {
    statusText.textContent = 'Por favor, digite algo antes de salvar!';
    statusText.style.color = 'red';
  }
});

// Ao carregar a página, verifica se há código no URL ou no localStorage
window.onload = () => {
  // Recupera o código do localStorage se estiver salvo
  const savedCode = localStorage.getItem('sharedCode');
  if (savedCode) {
    const code = atob(savedCode);
    codeEditor.value = code;
  }

  // Verifica se há código na URL
  const urlParams = new URLSearchParams(window.location.search);
  const codeId = urlParams.get('code');
  if (codeId) {
    // Decodifica o código da URL e carrega no editor
    const code = atob(codeId);
    codeEditor.value = code;
  }
};

// Desabilitar o botão de salvar se o campo estiver vazio
codeEditor.addEventListener('input', () => {
  saveButton.disabled = !codeEditor.value.trim();
});
