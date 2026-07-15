(function () {
  const activeKey = "seatmap-training-active";
  const stepKey = "seatmap-training-step";
  const modeKey = "seatmap-training-mode";
  const versionKey = "seatmap-demo-version";
  const stateKey = "seatmap-demo-state-v3";
  const demoAdmin = { id: 1, name: "Demo Admin", email: "admin@seatmap.local", role: "Owner" };

  const copy = {
    ru: {
      launcher: "Обучение",
      close: "Закрыть обучение",
      kicker: "SeatMap training",
      prev: "Назад",
      next: "Дальше",
      finish: "Готово",
      step: "Шаг",
      of: "из",
      actionFallback: "Выполнить",
      routeAction: "Перейти",
      basicTitle: "Basic",
      basicText: "Гостевой путь: бронь, карта столов и проверка в админке.",
      proTitle: "Pro",
      proText: "Полный тест: бронь, приход гостя, digital menu, кухня, бар и карта официанта.",
      chooseTitle: "Выберите сценарий обучения.",
      chooseCopy: "Basic показывает короткий путь бронирования. Pro проведёт через полный операционный сценарий с заказом и готовностью блюд.",
      chooseNote: "Данные демо хранятся только в этом браузере и автоматически очищаются через 3 часа.",
    },
    en: {
      launcher: "Training",
      close: "Close training",
      kicker: "SeatMap training",
      prev: "Back",
      next: "Next",
      finish: "Done",
      step: "Step",
      of: "of",
      actionFallback: "Run",
      routeAction: "Go",
      basicTitle: "Basic",
      basicText: "Guest flow: booking, table map and admin check.",
      proTitle: "Pro",
      proText: "Full test: booking, arrival, digital menu, kitchen, bar and waiter map.",
      chooseTitle: "Choose a training scenario.",
      chooseCopy: "Basic shows the booking flow. Pro walks through the full operational order scenario.",
      chooseNote: "Demo data stays only in this browser and is cleared automatically after 3 hours.",
    },
    bg: {
      launcher: "Обучение",
      close: "Затвори обучението",
      kicker: "SeatMap training",
      prev: "Назад",
      next: "Напред",
      finish: "Готово",
      step: "Стъпка",
      of: "от",
      actionFallback: "Изпълни",
      routeAction: "Отвори",
      basicTitle: "Basic",
      basicText: "Пътят на госта: резервация, карта на масите и проверка в админ панела.",
      proTitle: "Pro",
      proText: "Пълен тест: резервация, пристигане, digital menu, кухня, бар и карта за сервитьора.",
      chooseTitle: "Изберете сценарий за обучение.",
      chooseCopy: "Basic показва резервацията. Pro води през пълния оперативен сценарий с поръчка.",
      chooseNote: "Демо данните остават само в този браузър и се изчистват автоматично след 3 часа.",
    },
  };

  function lang() {
    const value = window.localStorage.getItem("restaurant-lang") || window.localStorage.getItem("dispace-language") || "ru";
    return copy[value] ? value : "ru";
  }

  function t(key) {
    return copy[lang()][key] || copy.ru[key] || key;
  }

  function route(path) {
    return new URL(path, window.location.origin).href;
  }

  function isAdmin() {
    return window.location.pathname.includes("/seatmap-app/admin");
  }

  function isReservation() {
    return window.location.pathname.includes("/seatmap-app/reservation");
  }

  function setAdminSession() {
    try {
      window.sessionStorage.setItem("admin-token", "seatmap-demo-token");
      window.sessionStorage.setItem("admin-user", JSON.stringify(demoAdmin));
    } catch {}
  }

  function setVersion(mode) {
    try {
      window.localStorage.setItem(versionKey, mode);
      window.sessionStorage.setItem("seatmap-admin-mode", mode);
      window.sessionStorage.setItem("seatmap-entry-complete", "true");
      if (mode === "pro") setAdminSession();
    } catch {}
  }

  function hideEntryModal() {
    const modal = document.getElementById("seatmapEntryModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("seatmap-version-lock");
  }

  function readState() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(stateKey) || "{}");
      return {
        nextReservationId: Number(parsed.nextReservationId) || 1,
        reservations: Array.isArray(parsed.reservations) ? parsed.reservations : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        blacklist: Array.isArray(parsed.blacklist) ? parsed.blacklist : [],
        admins: Array.isArray(parsed.admins) && parsed.admins.length ? parsed.admins : [demoAdmin],
        audit: Array.isArray(parsed.audit) ? parsed.audit : [],
        ...parsed,
      };
    } catch {
      return { nextReservationId: 1, reservations: [], orders: [], blacklist: [], admins: [demoAdmin], audit: [] };
    }
  }

  function writeState(state) {
    try {
      window.localStorage.setItem(stateKey, JSON.stringify({ ...state, savedAtUtc: new Date().toISOString() }));
    } catch {}
  }

  function tomorrowIso() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }

  function ensureDemoReservation(arrived = false) {
    const state = readState();
    const existing = state.reservations.find((item) => item.guestName === "Training Guest" || item.name === "Training Guest");
    if (existing) {
      if (arrived) {
        existing.status = "Approved";
        existing.isArrived = true;
        existing.arrivedAtUtc = existing.arrivedAtUtc || new Date().toISOString();
      }
      writeState(state);
      return existing;
    }
    const id = Math.max(Number(state.nextReservationId) || 1, ...state.reservations.map((item) => Number(item.id) || 0)) + 1;
    const reservation = {
      id,
      guestName: "Training Guest",
      name: "Training Guest",
      phone: "+359879323232",
      email: "dispacesoftware@gmail.com",
      guestCount: 2,
      guests: 2,
      reservedDate: tomorrowIso(),
      date: tomorrowIso(),
      reservedTime: "19:30",
      time: "19:30",
      area: "indoor",
      areaId: "indoor",
      areaName: "indoor",
      tableIds: ["6"],
      tableId: "6",
      status: "Approved",
      isArrived: arrived,
      arrivedAtUtc: arrived ? new Date().toISOString() : null,
      notes: "Created by SeatMap training.",
      createdAtUtc: new Date().toISOString(),
    };
    state.nextReservationId = id + 1;
    state.reservations.unshift(reservation);
    writeState(state);
    return reservation;
  }

  function ensureDemoOrder() {
    const reservation = ensureDemoReservation(true);
    const state = readState();
    if (state.orders.some((item) => item.guestName === "Training Guest")) return;
    const id = Math.max(0, ...state.orders.map((item) => Number(item.id) || 0)) + 1;
    state.orders.unshift({
      id,
      reservationId: reservation.id,
      guestName: "Training Guest",
      tableId: "6",
      areaId: "indoor",
      status: "New",
      source: "Training",
      total: 54,
      items: [
        { id: 2, name: "Vitello Tonnato", category: "Starters", price: 31, qty: 1 },
        { id: 11, name: "Aperol Spritz", category: "Drinks", price: 16, qty: 1 },
        { id: 13, name: "Italian Lemonade", category: "Drinks", price: 10, qty: 1 },
      ],
      createdAtUtc: new Date().toISOString(),
      updatedAtUtc: new Date().toISOString(),
    });
    writeState(state);
    window.dispatchEvent(new CustomEvent("seatmap:order-created"));
  }

  function dispatchValue(node, value) {
    if (!node) return;
    node.value = value;
    node.dispatchEvent(new Event("input", { bubbles: true }));
    node.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function fillReservationForm() {
    const textInputs = Array.from(document.querySelectorAll("input:not([type]), input[type='text']"));
    const email = document.querySelector("input[type='email'], input[name*='email' i]");
    const phone = document.querySelector("input[type='tel'], input[name*='phone' i]");
    const date = document.querySelector("input[type='date']");
    const time = document.querySelector("input[type='time']");
    const numbers = Array.from(document.querySelectorAll("input[type='number']"));

    dispatchValue(textInputs[0], "Training Guest");
    dispatchValue(email, "dispacesoftware@gmail.com");
    dispatchValue(phone, "+359879323232");
    dispatchValue(date, tomorrowIso());
    dispatchValue(time, "19:30");
    numbers.forEach((input) => {
      const min = Number(input.min || 0);
      const next = min > 2 ? min : 2;
      dispatchValue(input, String(next));
    });
  }

  function clickFirst(selectors) {
    const target = findTarget(selectors);
    if (!target) return false;
    target.click();
    return true;
  }

  function openProFlow() {
    setVersion("pro");
    setAdminSession();
    ensureDemoReservation(true);
    const launcher = document.getElementById("seatmapProLauncher");
    if (launcher) {
      launcher.click();
      return;
    }
    window.location.href = route("/seatmap-app/admin?version=pro&tour=1");
  }

  function openProDashboardWithOrder() {
    setVersion("pro");
    setAdminSession();
    ensureDemoOrder();
    const launcher = document.getElementById("seatmapProLauncher");
    if (launcher) launcher.click();
  }

  function start(mode) {
    const nextMode = mode || "pro";
    setVersion(nextMode);
    hideEntryModal();
    window.sessionStorage.setItem(activeKey, "true");
    window.sessionStorage.setItem(modeKey, nextMode);
    window.sessionStorage.setItem(stepKey, "0");
    const target = nextMode === "pro" ? "/seatmap-app/reservation?version=pro&tour=1" : "/seatmap-app/reservation?version=basic&tour=1";
    if (!isReservation()) window.location.href = route(target);
    else render();
  }

  function stop() {
    window.sessionStorage.removeItem(activeKey);
    window.sessionStorage.removeItem(stepKey);
    document.getElementById("seatmapTrainingLayer")?.classList.remove("is-open");
  }

  function mode() {
    return window.sessionStorage.getItem(modeKey) || window.localStorage.getItem(versionKey) || "pro";
  }

  function buildSteps(currentMode) {
    const basicSteps = [
      {
        title: "Карта бронирования",
        copy: "Здесь гость выбирает дату, время, количество гостей и свободный стол. Карта остаётся интерактивной, а обучение только подсвечивает нужную область.",
        target: ["form", "[class*='reservation' i]", "main"],
        actionLabel: "Заполнить демо-данные",
        action: fillReservationForm,
      },
      {
        title: "Выбор стола",
        copy: "Нажмите на свободный стол на карте. Для красивого теста можно выбрать стол 6 в основном зале.",
        target: ["[data-table-id]", "[aria-label*='table' i]", "[aria-label*='стол' i]", "button[class*='table' i]"],
        actionLabel: "Подготовить демо-бронь",
        action: () => ensureDemoReservation(false),
      },
      {
        title: "Отправка заявки",
        copy: "После отправки заявки появится окно с кнопкой открытия админ-панели. Бронь сохраняется только на этом устройстве.",
        target: ["button[type='submit']", "form button", "[class*='submit' i]", "[class*='primary' i]"],
      },
      {
        title: "Проверка в админке",
        copy: "В админ-панели команда видит новую резервацию и может подтвердить приход гостя. Я могу открыть её сразу с демо-бронью.",
        target: ["#seatmapReservationAdminModal", "#seatmapOpenAdminPanel"],
        actionLabel: "Открыть админку",
        action: () => {
          setVersion(currentMode);
          setAdminSession();
          ensureDemoReservation(false);
          window.location.href = route(`/seatmap-app/admin?version=${currentMode}&tour=1`);
        },
      },
      {
        title: "Резервации и карта",
        copy: "Здесь видно список броней, статус гостя и рабочую карту столов. В Basic сценарий на этом заканчивается.",
        target: ["[class*='reservation' i]", "main", "#root"],
      },
    ];

    if (currentMode !== "pro") return basicSteps;

    return [
      ...basicSteps.slice(0, 4),
      {
        title: "Pro CRM",
        copy: "В Pro после прихода гостя можно запустить digital menu и заказ. Если брони нет, обучение подготовит тестовую бронь автоматически.",
        target: ["#seatmapProLauncher", "[class*='reservation' i]", "main"],
        actionLabel: "Открыть Pro-flow",
        action: openProFlow,
      },
      {
        title: "Письмо гостю",
        copy: "Это имитация письма/сообщения для гостя. Кнопка открывает digital menu, где клиент выбирает блюда и напитки.",
        target: ["#seatmapProEmail", "[data-pro-open-menu]"],
        actionLabel: "Открыть digital menu",
        action: () => clickFirst(["[data-pro-open-menu]", "#seatmapProLauncher"]) || openProFlow(),
      },
      {
        title: "Digital menu",
        copy: "Выберите несколько позиций. Цена уже в евро, а заказ попадёт в кухню, бар и на карту официанта.",
        target: ["#seatmapProMenu", ".seatmap-pro-menu-item", "[data-pro-menu-grid]"],
        actionLabel: "Создать демо-заказ",
        action: openProDashboardWithOrder,
      },
      {
        title: "Кухня и бар",
        copy: "Слева кухня и бар принимают позиции по отделам. Нажмите «Отметить готово», чтобы блюдо подсветилось у официанта.",
        target: ["#seatmapProShell", "[data-pro-kitchen]", "[data-pro-ready]"],
        actionLabel: "Показать заказ",
        action: openProDashboardWithOrder,
      },
      {
        title: "Карта официанта",
        copy: "Справа используется та же логика столов, что и в резервациях. Когда кухня отмечает готовность, стол подсвечивается зелёным.",
        target: ["[data-pro-table-map]", ".seatmap-pro-table.has-ready", ".seatmap-pro-table.has-order"],
      },
    ];
  }

  function buildLayer() {
    if (document.getElementById("seatmapTrainingLayer")) return;
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div id="seatmapTrainingLayer" class="seatmap-training-layer" aria-hidden="true">
          <div class="seatmap-training-scrim"></div>
          <div class="seatmap-training-spotlight"></div>
          <section class="seatmap-training-card" role="dialog" aria-modal="false" aria-labelledby="seatmapTrainingTitle">
            <div class="seatmap-training-card-header">
              <div>
                <p class="seatmap-training-kicker">${t("kicker")}</p>
                <h2 id="seatmapTrainingTitle" class="seatmap-training-title"></h2>
              </div>
              <button class="seatmap-training-close" type="button" aria-label="${t("close")}">×</button>
            </div>
            <div class="seatmap-training-body">
              <p class="seatmap-training-copy"></p>
              <div class="seatmap-training-note" hidden></div>
              <div class="seatmap-training-modes" hidden>
                <button class="seatmap-training-mode" type="button" data-training-mode="basic">
                  <strong>${t("basicTitle")}</strong>
                  <span>${t("basicText")}</span>
                </button>
                <button class="seatmap-training-mode" type="button" data-training-mode="pro">
                  <strong>${t("proTitle")}</strong>
                  <span>${t("proText")}</span>
                </button>
              </div>
            </div>
            <div class="seatmap-training-progress"></div>
            <div class="seatmap-training-actions">
              <span class="seatmap-training-status"></span>
              <button class="seatmap-training-ghost" type="button" data-training-prev>${t("prev")}</button>
              <button class="seatmap-training-ghost" type="button" data-training-action hidden>${t("actionFallback")}</button>
              <button class="seatmap-training-button" type="button" data-training-next>${t("next")}</button>
            </div>
          </section>
        </div>
      `
    );

    const layer = document.getElementById("seatmapTrainingLayer");
    layer.querySelector(".seatmap-training-close").addEventListener("click", stop);
    layer.querySelector("[data-training-prev]").addEventListener("click", previousStep);
    layer.querySelector("[data-training-next]").addEventListener("click", () => {
      if (layer.dataset.trainingView === "chooser") start(mode());
      else nextStep();
    });
    layer.querySelector("[data-training-action]").addEventListener("click", runStepAction);
    layer.querySelectorAll("[data-training-mode]").forEach((button) => {
      button.addEventListener("click", () => start(button.dataset.trainingMode));
    });
  }

  function addLauncher() {
    if (document.getElementById("seatmapTrainingLauncher")) return;
    const launcher = document.createElement("button");
    launcher.id = "seatmapTrainingLauncher";
    launcher.className = "seatmap-training-launcher";
    launcher.type = "button";
    launcher.textContent = t("launcher");
    launcher.addEventListener("click", showChooser);
    document.body.appendChild(launcher);
  }

  function patchEntryModal() {
    const head = document.querySelector(".seatmap-entry-head");
    if (!head || document.querySelector(".seatmap-training-entry-action")) return;
    const button = document.createElement("button");
    button.className = "seatmap-entry-guide seatmap-training-entry-action";
    button.type = "button";
    button.textContent = t("launcher");
    button.addEventListener("click", showChooser);
    head.appendChild(button);
  }

  function currentStepIndex() {
    return Math.max(0, Number(window.sessionStorage.getItem(stepKey) || "0") || 0);
  }

  function setStepIndex(value) {
    window.sessionStorage.setItem(stepKey, String(Math.max(0, value)));
  }

  function currentStep() {
    const steps = buildSteps(mode());
    return { steps, index: Math.min(currentStepIndex(), steps.length - 1), step: steps[Math.min(currentStepIndex(), steps.length - 1)] };
  }

  function findTarget(selectors) {
    const list = Array.isArray(selectors) ? selectors : [selectors];
    for (const selector of list.filter(Boolean)) {
      let nodes = [];
      try {
        nodes = Array.from(document.querySelectorAll(selector));
      } catch {
        nodes = [];
      }
      const visible = nodes.find((node) => {
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        return rect.width > 4 && rect.height > 4 && style.visibility !== "hidden" && style.display !== "none";
      });
      if (visible) return visible;
    }
    return null;
  }

  function positionSpotlight() {
    const layer = document.getElementById("seatmapTrainingLayer");
    if (!layer || !layer.classList.contains("is-open")) return;
    const spotlight = layer.querySelector(".seatmap-training-spotlight");
    const scrim = layer.querySelector(".seatmap-training-scrim");
    const { step } = currentStep();
    const target = findTarget(step?.target);

    if (!target) {
      spotlight.classList.remove("is-visible");
      return;
    }

    const rect = target.getBoundingClientRect();
    const pad = 10;
    const left = Math.max(8, rect.left - pad);
    const top = Math.max(8, rect.top - pad);
    const width = Math.min(window.innerWidth - left - 8, rect.width + pad * 2);
    const height = Math.min(window.innerHeight - top - 8, rect.height + pad * 2);
    spotlight.style.left = `${left}px`;
    spotlight.style.top = `${top}px`;
    spotlight.style.width = `${width}px`;
    spotlight.style.height = `${height}px`;
    spotlight.classList.add("is-visible");
    scrim.style.setProperty("--spotlight-x", `${left + width / 2}px`);
    scrim.style.setProperty("--spotlight-y", `${top + height / 2}px`);
  }

  function renderChooser() {
    buildLayer();
    const layer = document.getElementById("seatmapTrainingLayer");
    layer.dataset.trainingView = "chooser";
    layer.classList.add("is-open");
    layer.setAttribute("aria-hidden", "false");
    layer.querySelector(".seatmap-training-title").textContent = t("chooseTitle");
    layer.querySelector(".seatmap-training-copy").textContent = t("chooseCopy");
    const note = layer.querySelector(".seatmap-training-note");
    note.hidden = false;
    note.textContent = t("chooseNote");
    layer.querySelector(".seatmap-training-modes").hidden = false;
    layer.querySelector(".seatmap-training-progress").innerHTML = "";
    layer.querySelector(".seatmap-training-status").textContent = "";
    layer.querySelector("[data-training-prev]").disabled = true;
    layer.querySelector("[data-training-action]").hidden = true;
    layer.querySelector("[data-training-next]").textContent = t("next");
    layer.querySelectorAll("[data-training-mode]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.trainingMode === mode());
    });
    layer.querySelector(".seatmap-training-spotlight").classList.remove("is-visible");
  }

  function showChooser() {
    renderChooser();
  }

  function render() {
    buildLayer();
    const layer = document.getElementById("seatmapTrainingLayer");
    const { steps, index, step } = currentStep();
    layer.dataset.trainingView = "tour";
    window.sessionStorage.setItem(activeKey, "true");
    window.sessionStorage.setItem(stepKey, String(index));

    layer.classList.add("is-open");
    layer.setAttribute("aria-hidden", "false");
    layer.querySelector(".seatmap-training-title").textContent = step.title;
    layer.querySelector(".seatmap-training-copy").textContent = step.copy;
    layer.querySelector(".seatmap-training-note").hidden = true;
    layer.querySelector(".seatmap-training-modes").hidden = true;
    layer.querySelector("[data-training-prev]").disabled = index === 0;

    const action = layer.querySelector("[data-training-action]");
    action.hidden = !step.actionLabel;
    action.textContent = step.actionLabel || t("actionFallback");

    layer.querySelector("[data-training-next]").textContent = index === steps.length - 1 ? t("finish") : t("next");
    layer.querySelector(".seatmap-training-status").textContent = `${t("step")} ${index + 1} ${t("of")} ${steps.length}`;
    layer.querySelector(".seatmap-training-progress").innerHTML = steps
      .map((_, itemIndex) => `<span class="seatmap-training-dot ${itemIndex === index ? "is-active" : ""}"></span>`)
      .join("");

    window.requestAnimationFrame(positionSpotlight);
  }

  function runStepAction() {
    const { step } = currentStep();
    if (typeof step.action === "function") step.action();
    window.setTimeout(render, 200);
  }

  function nextStep() {
    const { steps, index } = currentStep();
    if (index >= steps.length - 1) {
      stop();
      return;
    }

    const nextIndex = index + 1;
    setStepIndex(nextIndex);
    const next = steps[nextIndex];
    if (next && /админ|CRM|Pro/i.test(next.title) && !isAdmin()) {
      setAdminSession();
      ensureDemoReservation(mode() === "pro");
      window.location.href = route(`/seatmap-app/admin?version=${mode()}&tour=1`);
      return;
    }
    render();
  }

  function previousStep() {
    const nextIndex = Math.max(0, currentStepIndex() - 1);
    setStepIndex(nextIndex);
    render();
  }

  function shouldAutoStart() {
    const params = new URLSearchParams(window.location.search);
    return (
      params.get("tour") === "1" ||
      params.get("training") === "1" ||
      params.get("learn") === "1" ||
      window.sessionStorage.getItem(activeKey) === "true"
    );
  }

  function init() {
    buildLayer();
    addLauncher();
    patchEntryModal();
    new MutationObserver(() => {
      patchEntryModal();
      if (window.sessionStorage.getItem(activeKey) === "true") positionSpotlight();
    }).observe(document.body, { childList: true, subtree: true });

    window.addEventListener("resize", positionSpotlight);
    window.addEventListener("scroll", positionSpotlight, true);

    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("version") === "basic" ? "basic" : params.get("version") === "pro" ? "pro" : "";
    if (requestedMode) window.sessionStorage.setItem(modeKey, requestedMode);
    if (shouldAutoStart()) {
      hideEntryModal();
      window.sessionStorage.setItem(activeKey, "true");
      if (!window.sessionStorage.getItem(modeKey)) window.sessionStorage.setItem(modeKey, requestedMode || "pro");
      render();
    }
  }

  window.SeatMapTraining = {
    start,
    stop,
    next: nextStep,
    previous: previousStep,
    seedReservation: ensureDemoReservation,
    seedOrder: ensureDemoOrder,
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
