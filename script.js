(() => {
  const C = window.CONFIG;
  const $ = (s) => document.querySelector(s);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Cinnamoroll ----------
  const tpl = $("#cinna-tpl");
  document.querySelectorAll(".cinna-slot").forEach((slot) => slot.appendChild(tpl.content.cloneNode(true)));

  // ---------- Conteúdo a partir do config ----------
  const when = new Date(C.dataHora);
  const validDate = !isNaN(when);
  const fmtData = validDate
    ? when.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "—";
  const fmtHora = validDate
    ? when.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")
    : "—";

  $("#heroName").textContent = C.nome;
  $("#heroAge").textContent = C.idade > 0 ? `faz ${C.idade} aninhos! 🎂` : "";
  $("#heroMsg").textContent = C.mensagem;
  $("#infoData").textContent = fmtData;
  $("#infoHora").textContent = C.horaFim ? `${fmtHora} às ${C.horaFim.replace(":", "h")}` : fmtHora;
  $("#infoLocal").textContent = C.local;
  $("#infoEnd").textContent = C.endereco;
  $("#mapsBtn").href = C.mapsLink;
  if (C.mapsEmbed) { const f = $("#mapFrame"); f.src = C.mapsEmbed; f.hidden = false; }
  if (C.observacoes) { const o = $("#infoObs"); o.textContent = C.observacoes; o.hidden = false; }
  document.title = `Aniversário da ${C.nome} ☁️`;

  // ---------- Contagem regressiva ----------
  function tick() {
    const box = $("#countdown");
    if (!validDate) return;
    let diff = when - Date.now();
    if (diff <= 0) { box.innerHTML = '<div class="party">É hoje! Vamos festejar 🎉</div>'; return; }
    const s = Math.floor(diff / 1000);
    const parts = [["dias", Math.floor(s / 86400)], ["horas", Math.floor(s / 3600) % 24], ["min", Math.floor(s / 60) % 60], ["seg", s % 60]];
    box.innerHTML = parts.map(([l, v]) => `<div class="box"><b>${String(v).padStart(2, "0")}</b><span>${l}</span></div>`).join("");
  }
  tick();
  setInterval(tick, 1000);

  // ---------- Chuva de corações / estrelas ----------
  const fx = $("#fx");
  const EMOJIS = ["💙", "💗", "⭐", "✨", "☁️", "🎀", "🤍", "🎉"];
  function burst(n = 46, spread = true) {
    if (reduceMotion) return;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("i");
      el.textContent = EMOJIS[(Math.random() * EMOJIS.length) | 0];
      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = 16 + Math.random() * 26 + "px";
      el.style.animationDuration = 3.2 + Math.random() * 3.2 + "s";
      el.style.animationDelay = (spread ? Math.random() * 1.6 : Math.random() * 0.3) + "s";
      el.style.setProperty("--dx", (Math.random() - 0.5) * 160 + "px");
      el.style.setProperty("--rot", (Math.random() - 0.5) * 720 + "deg");
      el.addEventListener("animationend", () => el.remove());
      fx.appendChild(el);
    }
  }

  // ---------- Áudio ----------
  const bgm = $("#bgm");
  const musicBtn = $("#musicBtn");
  bgm.src = C.musica;
  bgm.volume = 0.7;
  let wantsMusic = true;

  function setMusicUI(playing) {
    musicBtn.textContent = playing ? "🎵" : "🔇";
    musicBtn.setAttribute("aria-label", playing ? "Pausar música" : "Tocar música");
  }
  async function startMusic() {
    try { await bgm.play(); musicBtn.hidden = false; setMusicUI(true); }
    catch { musicBtn.hidden = true; } // arquivo ausente ou bloqueado: segue sem som
  }
  musicBtn.addEventListener("click", () => {
    if (bgm.paused) { wantsMusic = true; bgm.play(); } else { wantsMusic = false; bgm.pause(); }
  });
  bgm.addEventListener("play", () => setMusicUI(true));
  bgm.addEventListener("pause", () => setMusicUI(false));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) bgm.pause(); else if (wantsMusic && $("#cover").classList.contains("open")) bgm.play().catch(() => {});
  });

  // ---------- Abertura ----------
  const cover = $("#cover");
  const site = $("#site");
  let opened = false;
  $("#openBtn").addEventListener("click", () => {
    if (opened) return;
    opened = true;
    cover.classList.add("open");
    startMusic();
    burst(50);
    setTimeout(() => burst(30), 1300);
    setTimeout(() => {
      site.hidden = false;
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
      requestAnimationFrame(() => site.classList.add("show"));
      cover.classList.add("gone");
      setTimeout(() => cover.remove(), 1000);
    }, reduceMotion ? 300 : 2300);
  });

  // ---------- Confirmação de presença (mensagem automática no WhatsApp) ----------
  const form = $("#rsvpForm");
  const formMsg = $("#formMsg");

  function waLink(nome) {
    const txt = `Oi! Aqui é ${nome} 💙 Confirmo presença no aniversário da ${C.nome}! 🎉☁️`;
    return `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(txt)}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.elements.nome.value.trim();
    if (nome.length < 2) {
      formMsg.textContent = "Escreve o seu nomezinho pra gente 💙";
      formMsg.hidden = false;
      form.elements.nome.focus();
      return;
    }
    formMsg.hidden = true;
    const url = waLink(nome);
    if (!window.open(url, "_blank", "noopener")) window.location.href = url; // popup bloqueado

    form.hidden = true;
    $("#thanks").hidden = false;
    $("#thanksText").innerHTML = `Obrigada, ${nome.split(" ")[0]}! Se o WhatsApp não abriu, <a href="${url}" target="_blank" rel="noopener">toque aqui</a>.`;
    burst(40, false);
    $("#thanks").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  });
})();
