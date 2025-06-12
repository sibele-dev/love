// --- BOA PRÁTICA: Executar o script apenas quando o HTML estiver totalmente carregado ---
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. SELEÇÃO DE ELEMENTOS ---
  // Pegamos todos os elementos que vamos usar uma única vez e guardamos em constantes.
  const startButton = document.querySelector('.start-button');
  const heartButton = document.querySelector('.heart-button');

  const sound = document.getElementById('startSound');
  const counterElement = document.getElementById('counter');
  const counterContainer = document.querySelector('.counter-container');

  const dialogArea = document.getElementById('dialogos');
  const dialog1 = document.getElementById('fala1');
  const dialog2 = document.getElementById('fala2');
  // Se você tinha 'fala3' no HTML e não quer mais, pode remover esta linha:
  // const dialog3 = document.getElementById('fala3');

  const finalMessageContainer = document.querySelector('.final-message-container');
  const messageElement = document.getElementById('message');

  // --- CONFIGURAÇÕES ---
  // A data de início do amor de vocês. Altere para a sua data!
  const startDate = new Date("2024-07-13T22:00:00");
  const texto1 = "Zelda: Link... mesmo sem dizer uma palavra, você me mostra o amor mais sincero.";
  const texto2 = "[Você recebeu:] Um coração inteiro. Use com cuidado. É o meu. 💚";
  const textoFinal = "Meu amor, eu agradeço para sempre o dia que lhe conheci!";
  // Se você tinha 'poeminja' e não quer mais, pode remover esta linha:
  // const poeminha = "Em cada estrela no céu a brilhar,\nSinto o seu amor, a me guiar.\nEm cada passo, em cada canção,\nVocê é a luz do meu coração.";


  // --- 2. ADIÇÃO DE EVENTOS (EVENT LISTENERS) ---
  // A forma moderna de lidar com cliques, sem 'onclick' no HTML.
  startButton.addEventListener('click', startLove);
  // Mantemos o evento do coração para que ele ainda possa ser clicado,
  // mesmo que o texto final já esteja visível.
  heartButton.addEventListener('click', showFinalMessage);


  // --- 3. FUNÇÕES ---

  /**
   * Função para atualizar o contador de tempo.
   */
  function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    counterElement.innerText = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
  }

  /**
   * Efeito de digitação que retorna uma promessa.
   * Permite usar `await` para esperar a digitação terminar.
   */
  function typeWriter(element, text, delay = 50) {
    return new Promise(resolve => {
      let i = 0;
      element.innerHTML = '';

      function typing() {
        // Lida com quebras de linha para textos multilinhas
        if (text.charAt(i) === '\n') {
          element.innerHTML += '<br>';
        } else {
          element.innerHTML += text.charAt(i);
        }
        i++;

        if (i < text.length) {
          setTimeout(typing, delay);
        } else {
          resolve();
        }
      }
      typing();
    });
  }

  /**
   * Pausa a execução por um determinado tempo em milissegundos.
   */
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Função principal que controla a sequência: Botão -> Diálogo 1 -> Diálogo 2 -> Texto Final -> Contador + Coração.
   */
  async function startLove() {
    // Esconde o botão 'Start' e mostra a área de diálogo
    startButton.classList.add('hidden');
    dialogArea.classList.remove('hidden');

    // Tenta tocar o som
    sound.currentTime = 0;
    sound.play().catch(e => console.error("Navegador impediu a reprodução automática do áudio.", e));

    await wait(500); // Pequena pausa

    // 1º Diálogo
    dialog1.classList.remove('hidden');
    await typeWriter(dialog1, texto1);

    await wait(1500); // Pausa para leitura

    // 2º Diálogo
    dialog2.classList.remove('hidden');
    await typeWriter(dialog2, texto2);

    await wait(1500); // Pausa para leitura

    // Esconde os diálogos anteriores para focar no texto final
    dialog1.classList.add('hidden');
    dialog2.classList.add('hidden');

    // Mostra o contêiner da mensagem final E o texto final
    finalMessageContainer.classList.remove('hidden');
    messageElement.innerText = textoFinal; // Define o texto final
    messageElement.classList.remove('hidden'); // Torna o texto final visível

    await wait(2000); // Pausa após o texto final aparecer para o usuário ler

    // AGORA SIM: Mostra o contador e o coração (que estão dentro do finalMessageContainer)
    // O counterContainer já é exibido quando o finalMessageContainer é mostrado,
    // mas garantimos que ele não esteja 'hidden' por algum motivo.
    counterContainer.classList.remove('hidden');
    heartButton.classList.remove('hidden'); // Garante que o coração esteja visível
  }

  /**
   * Mostra a mensagem final ao clicar no botão de coração.
   * Agora que o texto final aparece automaticamente, esta função pode ter outra utilidade,
   * ou ser removida se o coração não tiver mais interação além de sua presença visual.
   */
  function showFinalMessage() {
    // Como o texto já está visível, o clique no coração pode não fazer nada,
    // ou você pode adicionar uma nova interação aqui (ex: vibrar, mudar cor, etc.)
    console.log("Coração clicado! Mensagem final já visível.");
  }


  // --- 4. INICIALIZAÇÃO ---
  // Inicia o contador imediatamente (ele estará escondido até ser revelado em startLove).
  updateCounter();
  setInterval(updateCounter, 1000); // Continua atualizando o contador em segundo plano.

});