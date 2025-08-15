document.addEventListener('DOMContentLoaded', () => {
  const intervaloSelect = document.getElementById('intervalo');
  const guardarBtn = document.getElementById('guardar');
  const messageElement = document.getElementById('message');

  chrome.storage.sync.get('intervaloTiempo', (data) => {
    if (data.intervaloTiempo) {
      intervaloSelect.value = data.intervaloTiempo;
    }
  });

  guardarBtn.addEventListener('click', () => {
    const intervaloSeleccionado = intervaloSelect.value;
    chrome.storage.sync.set({ intervaloTiempo: intervaloSeleccionado }, () => {
      console.log('Intervalo guardado:', intervaloSeleccionado, 'minutos');
      
      messageElement.textContent = 'Tiempo de intervalo de guardado';
      messageElement.classList.add('show');
      
      chrome.runtime.sendMessage({ action: 'updateAlarm', interval: parseInt(intervaloSeleccionado) });
    });
  });
});