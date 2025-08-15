// Lista de mensajes motivacionales con rutas absolutas
const mensajes = [
  { texto: "💧 Toma un vaso de agua", imagen: chrome.runtime.getURL("assets/images/water.png") },
  { texto: "🧘‍♂️ Estira la espalda", imagen: chrome.runtime.getURL("assets/images/stretch.png") },
  { texto: "👀 Descansa la vista 20 seg", imagen: chrome.runtime.getURL("assets/images/eyes.png") },
  { texto: "🪑 Ajusta tu postura", imagen: chrome.runtime.getURL("assets/images/posture.png") },
  { texto: "🤚 Relaja las manos", imagen: chrome.runtime.getURL("assets/images/hands.png") },
  { texto: "🚶 Camina un minuto", imagen: chrome.runtime.getURL("assets/images/walk.png") },
  { texto: "🌬 Respira profundo", imagen: chrome.runtime.getURL("assets/images/breath.png") },
  { texto: "🖐 Micro pausa", imagen: chrome.runtime.getURL("assets/images/pause.png") },
  { texto: "📏 Alinea la pantalla", imagen: chrome.runtime.getURL("assets/images/monitor.png") },
  { texto: "🎵 Pausa activa", imagen: chrome.runtime.getURL("assets/images/music.png") }
];

function showNotification() {
  const random = mensajes[Math.floor(Math.random() * mensajes.length)];

  chrome.notifications.create({
    type: "basic",
    iconUrl: random.imagen,
    title: "Momento Wellness",
    message: random.texto
  }, (notificationId) => {
    setTimeout(() => {
      chrome.notifications.clear(notificationId);
    }, 10000);
  });
}

function updateAlarm(intervalo) {
  chrome.alarms.clear("Wellness Pal", () => {
    chrome.alarms.create("Wellness Pal", { periodInMinutes: intervalo });
    console.log(`Alarma actualizada para dispararse cada ${intervalo} minutos.`);
  });
}

// Escuchar mensajes de popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateAlarm') {
    updateAlarm(request.interval);
  }
});

// Cuando la extensión se instala o se actualiza, configura la alarma
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('intervaloTiempo', (data) => {
    const intervalo = data.intervaloTiempo ? parseInt(data.intervaloTiempo) : 30; // Valor predeterminado
    updateAlarm(intervalo);
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "Wellness Pal") {
    showNotification();
  }
});