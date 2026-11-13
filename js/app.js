/* Qyz Uzatu invitation — shared logic for all design variants.
   Features: i18n (kk/ru/en), countdown, calendar grid, add-to-calendar (.ics + Google),
   RSVP form -> Google Sheets (Apps Script), background music, reveal animations. */
(() => {
  // Always start at the top after a reload (don't restore previous scroll position).
  try {
    history.scrollRestoration = "manual";
  } catch (e) {}
  if (location.hash)
    history.replaceState(null, "", location.pathname + location.search);
  window.scrollTo(0, 0);
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) window.scrollTo(0, 0);
  });

  const CONFIG = {
    // Paste the deployed Google Apps Script Web App URL here (see apps-script/Code.gs).
    // While empty, the form runs in demo mode (answers are only kept in localStorage).
    RSVP_URL:
      "https://script.google.com/macros/s/AKfycbzgZHg9xGE498vRJwzx80AsgJRVWclcnUyNt0bVx5xhGF42SFG-VM7f4B54Ua3YTVCx/exec",
    EVENT_START: "2027-03-21T13:00:00+05:00", // Asia/Aqtobe, UTC+5
    EVENT_END: "2027-03-21T22:00:00+05:00",
    DEFAULT_LANG: "kk",
  };

  const I18N = {
    kk: {
      doc_title: "Азиза — Қыз ұзату тойына шақыру",
      enter: "Шақыруды ашу",
      hero_kicker: "Қыз ұзату",
      hero_sub: "Той иелері Серік пен Махаббат сіздерді тойға шақырады",
      hero_date: "21 наурыз 2027 · жексенбі",
      badge_text: "21.03.2027 • 13:00 • АҚТӨБЕ •",
      hero_scroll: "Төмен түсіңіз",
      invite_title: "Құрметті қонақтар!",
      invite_text:
        "Сіздерді қызымыз Азизаның қыз ұзату тойына арналған салтанатты кешімізге қонақ болуға шақырамыз. Қуанышымызды бірге бөлісіңіздер!",
      hosts_label: "Той иелері",
      couple_label: "Жас жұбайлар",
      cd_title: "Тойға дейін",
      cd_d: "күн",
      cd_h: "сағат",
      cd_m: "минут",
      cd_s: "секунд",
      when_title: "Уақыты мен орны",
      when_date: "Күні",
      when_date_v: "21 наурыз 2027, жексенбі",
      when_gather: "Қонақтар жиналуы",
      when_gather_v: "12:00",
      when_time: "Той басталуы",
      when_time_v: "13:00",
      when_place: "Мекенжайы",
      when_place_v: "Ақтөбе қ., Әлия Молдағұлова даңғылы, 34/2",
      when_place_t: "Ақтөбе қ., Amira Grand Hall мейрамханасы",
      when_place_s: "Әлия Молдағұлова даңғылы, 34/2",
      map_2gis: "2GIS-те ашу",
      map_yandex: "Яндекс Карталарда ашу",
      cal_title: "Күнтізбе",
      cal_month: "Наурыз 2027",
      cal_add: "Күнтізбеге қосу",
      cal_google: "Google Calendar",
      cal_ics: "Apple / Android (.ics)",
      cal_event: "Қыз ұзату тойы",
      dress_title: "Түстер палитрасы",
      dress_text:
        "Біздің түстер палитрамызды қолдасаңыздар, өте қуанышты боламыз. Бұл міндетті талап емес — тек тілегіміз.",
      rsvp_title: "Қатысуыңызды растаңыз",
      rsvp_lead: "Дайындықты дұрыс жүргізу үшін жауабыңызды күтеміз.",
      rsvp_name: "Аты-жөніңіз",
      rsvp_name_ph: "Мысалы: Айгерім Сәрсенова",
      rsvp_status: "Сіздің жауабыңыз",
      rsvp_note: "Тілектер мен ескертпелер (міндетті емес)",
      rsvp_note_ph: "Мысалы: аллергия, қосымша қонақ, тілек…",
      rsvp_choose: "Таңдаңыз",
      rsvp_yes: "Келемін",
      rsvp_no: "Келе алмаймын",
      rsvp_send: "Жіберу",
      rsvp_again: "Тағы бір жауап жіберу",
      rsvp_sending: "Жіберілуде…",
      rsvp_ok: "Рақмет! Жауабыңыз қабылданды.",
      rsvp_err: "Жіберу мүмкін болмады. Қайталап көріңіз.",
      rsvp_req: "Аты-жөніңізді жазып, жауабыңызды таңдаңыз.",
      music_on: "Музыканы қосу",
      music_off: "Музыканы өшіру",
      music_ring: "МУЗЫКА · МУЗЫКА · МУЗЫКА ·",
      footer: "Сіздерді күтеміз!",
      weekdays: ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"],
    },
    ru: {
      doc_title: "Азиза — приглашение на Кыз узату",
      enter: "Открыть приглашение",
      hero_kicker: "Кыз узату",
      hero_sub: "Хозяева торжества Серик и Махаббат приглашают вас на праздник",
      hero_date: "21 марта 2027 · воскресенье",
      badge_text: "21.03.2027 • 13:00 • АКТОБЕ •",
      hero_scroll: "Листайте вниз",
      invite_title: "Дорогие гости!",
      invite_text:
        "С радостью приглашаем вас на торжество «Кыз узату» — проводы нашей дочери Азизы. Будем счастливы разделить этот день с вами!",
      hosts_label: "Хозяева торжества",
      couple_label: "Молодожены",
      cd_title: "До торжества осталось",
      cd_d: "дней",
      cd_h: "часов",
      cd_m: "минут",
      cd_s: "секунд",
      when_title: "Когда и где",
      when_date: "Дата",
      when_date_v: "21 марта 2027, воскресенье",
      when_gather: "Сбор гостей",
      when_gather_v: "12:00",
      when_time: "Начало торжества",
      when_time_v: "13:00",
      when_place: "Адрес",
      when_place_v: "г. Актобе, проспект Алии Молдагуловой, 34/2",
      when_place_t: "г. Актобе, ресторан Amira Grand Hall",
      when_place_s: "Проспект Алии Молдагуловой, 34/2",
      map_2gis: "Открыть в 2GIS",
      map_yandex: "Открыть в Яндекс Картах",
      cal_title: "Календарь",
      cal_month: "Март 2027",
      cal_add: "Добавить в календарь",
      cal_google: "Google Calendar",
      cal_ics: "Apple / Android (.ics)",
      cal_event: "Торжество «Кыз узату»",
      dress_title: "Цветовая палитра",
      dress_text:
        "Мы будем очень рады, если вы поддержите цветовую палитру нашего праздника. Это не строгий дресс-код, а лишь наше пожелание.",
      rsvp_title: "Подтвердите присутствие",
      rsvp_lead:
        "Просим сообщить о своём решении — это поможет нам лучше подготовиться.",
      rsvp_name: "Ваше ФИО",
      rsvp_name_ph: "Например: Айгерим Сарсенова",
      rsvp_status: "Ваш ответ",
      rsvp_note: "Пожелания и заметки (необязательно)",
      rsvp_note_ph: "Например: аллергии, дополнительный гость, пожелания…",
      rsvp_choose: "Выберите",
      rsvp_yes: "Приду",
      rsvp_no: "Не смогу прийти",
      rsvp_send: "Отправить",
      rsvp_again: "Отправить ещё один ответ",
      rsvp_sending: "Отправляем…",
      rsvp_ok: "Спасибо! Ваш ответ получен.",
      rsvp_err: "Не удалось отправить. Попробуйте ещё раз.",
      rsvp_req: "Укажите ФИО и выберите ответ.",
      music_on: "Включить музыку",
      music_off: "Выключить музыку",
      music_ring: "МУЗЫКА · МУЗЫКА · МУЗЫКА ·",
      footer: "Ждём вас!",
      weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    },
    en: {
      doc_title: "Aziza — Qyz Uzatu invitation",
      enter: "Open invitation",
      hero_kicker: "Qyz Uzatu",
      hero_sub: "Serik and Makhabbat invite you to celebrate with them",
      hero_date: "Sunday, 21 March 2027",
      badge_text: "03/21/2027 • 1:00 PM • AKTOBE •",
      hero_scroll: "Scroll down",
      invite_title: "Dear guests!",
      invite_text:
        "We joyfully invite you to the Qyz Uzatu, the traditional farewell celebration for our daughter Aziza. We would be happy to share this day with you!",
      hosts_label: "Hosts",
      couple_label: "The couple",
      cd_title: "Time until the celebration",
      cd_d: "days",
      cd_h: "hours",
      cd_m: "minutes",
      cd_s: "seconds",
      when_title: "When & where",
      when_date: "Date",
      when_date_v: "Sunday, 21 March 2027",
      when_gather: "Guests arrive",
      when_gather_v: "12:00 PM",
      when_time: "Celebration starts",
      when_time_v: "1:00 PM",
      when_place: "Address",
      when_place_v: "Aktobe, 34/2 Aliya Moldagulova Avenue",
      when_place_t: "Aktobe, Amira Grand Hall restaurant",
      when_place_s: "34/2 Aliya Moldagulova Avenue",
      map_2gis: "Open in 2GIS",
      map_yandex: "Open in Google Maps",
      cal_title: "Calendar",
      cal_month: "March 2027",
      cal_add: "Add to calendar",
      cal_google: "Google Calendar",
      cal_ics: "Apple / Android (.ics)",
      cal_event: "Qyz Uzatu celebration",
      dress_title: "Colour palette",
      dress_text:
        "We would be delighted if you joined us in our colour palette. It is not a strict dress code, just a wish.",
      rsvp_title: "Will you join us?",
      rsvp_lead: "Please let us know, it helps us prepare.",
      rsvp_name: "Full name",
      rsvp_name_ph: "e.g. Aigerim Sarsenova",
      rsvp_status: "Your answer",
      rsvp_note: "Wishes and notes (optional)",
      rsvp_note_ph: "e.g. allergies, plus-one, a few kind words…",
      rsvp_choose: "Choose",
      rsvp_yes: "I will come",
      rsvp_no: "I can’t come",
      rsvp_send: "Send",
      rsvp_again: "Send another response",
      rsvp_sending: "Sending…",
      rsvp_ok: "Thank you! Your answer has been received.",
      rsvp_err: "Could not send. Please try again.",
      rsvp_req: "Please enter your name and choose an answer.",
      music_on: "Turn music on",
      music_off: "Turn music off",
      music_ring: "MUSIC · MUSIC · MUSIC ·",
      footer: "We look forward to seeing you!",
      weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    },
  };

  const LOCATION = "Ақтөбе, проспект Алии Молдагуловой, 34/2";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k) {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch {
        /* ignore */
      }
    },
  };

  let lang = CONFIG.DEFAULT_LANG;
  const t = (k) => (I18N[lang] && I18N[lang][k]) ?? I18N.kk[k] ?? k;

  /* ---------- i18n ---------- */
  function applyLang(l) {
    if (!I18N[l]) l = CONFIG.DEFAULT_LANG;
    lang = l;
    store.set("lang", l);
    try {
      const u = new URL(location.href);
      u.searchParams.set("lang", l);
      history.replaceState(null, "", u);
    } catch (e) {}
    document.documentElement.lang = l;
    document.title = t("doc_title");
    $$("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    $$("[data-href-" + l + "]").forEach((el) => {
      el.href = el.getAttribute("data-href-" + l);
    });
    $$("[data-href-default]").forEach((el) => {
      if (!el.hasAttribute("data-href-" + l)) el.href = el.dataset.hrefDefault;
    });
    $$("[data-i18n-ph]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPh);
    });
    $$("[data-lang]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === l)),
    );
    $$("[data-i18n-ph]").forEach(
      (el) => (el.placeholder = t(el.dataset.i18nPh)),
    );
    const f = $("#rsvp-form");
    if (f && f.classList.contains("sent")) {
      const m = $("#rsvp-msg");
      if (m) m.textContent = t("rsvp_ok");
    }
    renderCalendar();
    updateMusicLabel();
  }

  function renderCalendar() {
    const box = $("[data-calendar]");
    if (!box) return;
    const start = new Date(CONFIG.EVENT_START);
    // Event date as shown in Aqtobe (UTC+5): take components from the ISO string itself.
    const [y, m, d] = CONFIG.EVENT_START.slice(0, 10).split("-").map(Number);
    const first = new Date(Date.UTC(y, m - 1, 1));
    const offset = (first.getUTCDay() + 6) % 7; // Monday-first
    const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
    let html = t("weekdays")
      .map((w) => `<span class="wd">${w}</span>`)
      .join("");
    for (let i = 0; i < offset; i++) html += '<span class="day empty"></span>';
    for (let i = 1; i <= days; i++) {
      html +=
        i === d
          ? `<span class="day mark" aria-label="${t("when_date_v")}"><b>${i}</b></span>`
          : `<span class="day">${i}</span>`;
    }
    box.innerHTML = html;
    void start;
  }

  /* ---------- countdown ---------- */
  function tick() {
    const diff = Math.max(0, new Date(CONFIG.EVENT_START) - Date.now());
    const s = Math.floor(diff / 1000);
    const vals = {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60,
    };
    $$("[data-cd]").forEach((el) => {
      const v = vals[el.dataset.cd];
      el.textContent =
        el.dataset.cd === "d" ? String(v) : String(v).padStart(2, "0");
    });
  }

  /* ---------- add to calendar ---------- */
  const utc = (iso) =>
    new Date(iso)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const icsEscape = (s) =>
    s
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\n/g, "\\n");

  function downloadIcs() {
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Qyz Uzatu//Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:qyz-uzatu-20270321@invitation`,
      `DTSTAMP:${utc(new Date().toISOString())}`,
      `DTSTART:${utc(CONFIG.EVENT_START)}`,
      `DTEND:${utc(CONFIG.EVENT_END)}`,
      `SUMMARY:${icsEscape(t("cal_event") + " — " + (lang === "en" ? "Aziza" : "Азиза"))}`,
      `LOCATION:${icsEscape(LOCATION)}`,
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${icsEscape(t("cal_event"))}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    const blob = new Blob([lines.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "qyz-uzatu.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  function googleCalUrl() {
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: `${t("cal_event")} — ${lang === "en" ? "Aziza" : "Азиза"}`,
      dates: `${utc(CONFIG.EVENT_START)}/${utc(CONFIG.EVENT_END)}`,
      location: LOCATION,
    });
    return `https://calendar.google.com/calendar/render?${p}`;
  }

  /* ---------- RSVP ---------- */
  function initRsvp() {
    const form = $("#rsvp-form");
    if (!form) return;
    const msg = $("#rsvp-msg");
    const btn = $("button[type=submit]", form);
    if (store.get("rsvp-sent")) {
      form.classList.add("sent");
      msg.textContent = t("rsvp_ok");
      msg.classList.add("ok");
    }
    // Already answered (flag in localStorage, or just sent): let the guest send another answer,
    // e.g. for a family member. This only reopens the form; the stored flag is set again on the next send.
    const again = $("#rsvp-again", form);
    if (again)
      again.addEventListener("click", () => {
        form.classList.remove("sent");
        msg.textContent = "";
        msg.className = "msg";
        form.elements.name.focus();
      });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = form.elements.name.value.trim();
      const status = form.elements.status.value;
      const trap = form.elements.company ? form.elements.company.value : "";
      msg.className = "msg";
      if (!name || !status) {
        msg.textContent = t("rsvp_req");
        msg.classList.add("err");
        return;
      }
      if (trap) return; // honeypot
      const payload = {
        name: name.slice(0, 120),
        status,
        note: form.elements.note
          ? form.elements.note.value.trim().slice(0, 1000)
          : "",
        lang,
        ts: new Date().toISOString(),
      };
      btn.disabled = true;
      const label = btn.textContent;
      btn.textContent = t("rsvp_sending");
      try {
        if (CONFIG.RSVP_URL) {
          await fetch(CONFIG.RSVP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload),
          });
        } else {
          const all = JSON.parse(store.get("rsvp-demo") || "[]");
          all.push(payload);
          store.set("rsvp-demo", JSON.stringify(all));
          console.info("[demo] RSVP not sent (RSVP_URL is empty):", payload);
        }
        const finish = () => {
          msg.textContent = t("rsvp_ok");
          msg.classList.add("ok");
          form.reset();
          form.classList.add("sent"); // hide fields so the guest can't resubmit by mistake
          store.set("rsvp-sent", "1");
        };
        // A page may play an animation first: it calls preventDefault() and then detail.finish().
        const ev = new CustomEvent("rsvp:sent", {
          cancelable: true,
          detail: { form, finish },
        });
        if (document.dispatchEvent(ev)) finish();
      } catch {
        msg.textContent = t("rsvp_err");
        msg.classList.add("err");
      } finally {
        btn.disabled = false;
        btn.textContent = label;
      }
    });
  }

  /* ---------- music ---------- */
  const audio = () => $("#bgm");
  function updateMusicLabel() {
    const b = $("#music");
    const a = audio();
    if (!b || !a) return;
    const playing = !a.paused;
    b.setAttribute("aria-pressed", String(playing));
    b.setAttribute("aria-label", playing ? t("music_off") : t("music_on"));
    b.title = b.getAttribute("aria-label");
  }
  async function toggleMusic(forceOn) {
    const a = audio();
    if (!a) return;
    try {
      if (forceOn || a.paused) {
        a.volume = 0.5;
        await a.play();
      } else {
        a.pause();
      }
    } catch {
      /* no audio file yet or blocked */
    }
    updateMusicLabel();
  }

  /* ---------- init ---------- */
  function init() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    applyLang(fromUrl || store.get("lang") || CONFIG.DEFAULT_LANG);
    $$("[data-lang]").forEach((b) =>
      b.addEventListener("click", () => applyLang(b.dataset.lang)),
    );

    tick();
    setInterval(tick, 1000);

    const ics = $("#add-ics");
    if (ics) ics.addEventListener("click", downloadIcs);
    const g = $("#add-gcal");
    if (g)
      g.addEventListener("click", () =>
        window.open(googleCalUrl(), "_blank", "noopener"),
      );

    initRsvp();

    const music = $("#music");
    if (music) music.addEventListener("click", () => toggleMusic());
    const a = audio();
    if (a)
      ["play", "pause"].forEach((ev) =>
        a.addEventListener(ev, updateMusicLabel),
      );

    const enter = $("#enter");
    if (enter) {
      // body.locked alone doesn't stop the viewport scroll (html has overflow-x:clip),
      // so lock <html> and block touch/wheel scrolling while the curtain is shown.
      const root = document.documentElement;
      const stop = (e) => e.preventDefault();
      document.body.classList.add("locked");
      root.style.overflow = "hidden";
      root.style.overscrollBehavior = "none";
      ["touchmove", "wheel"].forEach((ev) =>
        enter.addEventListener(ev, stop, { passive: false }),
      );
      const open = () => {
        enter.classList.add("gone");
        document.body.classList.remove("locked");
        root.style.overflow = "";
        root.style.overscrollBehavior = "";
        ["touchmove", "wheel"].forEach((ev) =>
          enter.removeEventListener(ev, stop),
        );
        document.body.classList.add("opened");
        toggleMusic(true);
        document.dispatchEvent(new CustomEvent("invite:open"));
        setTimeout(() => enter.remove(), 1200);
      };
      $("#enter-btn", enter).addEventListener("click", open);
    } else {
      setTimeout(
        () => document.dispatchEvent(new CustomEvent("invite:open")),
        150,
      );
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
