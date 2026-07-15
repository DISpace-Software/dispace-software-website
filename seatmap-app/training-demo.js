(function () {
  const activeKey = "seatmap-training-active";
  const stepKey = "seatmap-training-step";
  const modeKey = "seatmap-training-mode";
  const versionKey = "seatmap-demo-version";
  const stateKey = "seatmap-demo-state-v3";
  const registrationKey = "seatmap-beta-registration";
  const signalKey = "seatmap-training-signals";
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
      launchTitle: "Как запустить {mode}?",
      launchCopy: "Можно сразу открыть демо без подсказок или пройти его с обучением, где будут подсвечены нужные кнопки и функции.",
      withoutTraining: "Без обучения",
      withoutTrainingText: "Открыть демо сразу и тестировать самостоятельно.",
      withTraining: "С обучением",
      withTrainingText: "Пошаговые подсказки, подсветка кнопок и быстрые демо-действия.",
      registrationTitle: "Регистрация для тестирования SeatMap beta",
      registrationCopy: "Перед запуском демо оставьте ваши данные и данные заведения. Так мы понимаем, кто тестирует систему, и сможем корректно связаться по обратной связи.",
      registrationSubmit: "Продолжить к выбору версии",
      registrationNote: "Данные сохраняются только в этом браузере для демо-сценария и не отправляются на внешний сервер.",
      waitAction: "Ожидаю действие на странице",
      doneAction: "Готово, действие выполнено",
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
      launchTitle: "How do you want to open {mode}?",
      launchCopy: "Open the demo directly or use guided training with highlighted buttons and actions.",
      withoutTraining: "Without training",
      withoutTrainingText: "Open the demo and test it yourself.",
      withTraining: "With training",
      withTrainingText: "Step-by-step guidance, highlighted controls and quick demo actions.",
      registrationTitle: "Register to test SeatMap beta",
      registrationCopy: "Before opening the demo, add your details and venue details so we know who is testing the system.",
      registrationSubmit: "Continue to version choice",
      registrationNote: "This demo stores the details only in this browser and does not send them to an external server.",
      waitAction: "Waiting for the page action",
      doneAction: "Done, action completed",
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
      launchTitle: "Как да отворим {mode}?",
      launchCopy: "Може да отворите демото директно или с обучение, което подсветява нужните бутони и функции.",
      withoutTraining: "Без обучение",
      withoutTrainingText: "Отворете демото и тествайте самостоятелно.",
      withTraining: "С обучение",
      withTrainingText: "Стъпки, подсветени контроли и бързи демо действия.",
      registrationTitle: "Регистрация за тест на SeatMap beta",
      registrationCopy: "Преди демото оставете вашите данни и данните на заведението, за да знаем кой тества системата.",
      registrationSubmit: "Продължи към избор на версия",
      registrationNote: "Данните се пазят само в този браузър за демо сценария и не се изпращат към външен сървър.",
      waitAction: "Очаквам действие на страницата",
      doneAction: "Готово, действието е изпълнено",
    },
  };

  function lang() {
    const value = window.localStorage.getItem("restaurant-lang") || window.localStorage.getItem("dispace-language") || "ru";
    return copy[value] ? value : "ru";
  }

  function t(key) {
    return copy[lang()][key] || copy.ru[key] || key;
  }

  function interpolate(template, values) {
    return String(template || "").replace(/\{(\w+)\}/g, (_, key) => values[key] || "");
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

  function showEntryModal() {
    const modal = document.getElementById("seatmapEntryModal");
    if (!modal) return;
    document.body.classList.add("seatmap-version-lock");
    modal.classList.add("is-open");
  }

  function targetPath(nextMode, training = false) {
    const params = new URLSearchParams();
    params.set("version", nextMode);
    if (training) params.set("tour", "1");
    return `/seatmap-app/reservation?${params.toString()}`;
  }

  function hasRegistration() {
    try {
      return Boolean(JSON.parse(window.localStorage.getItem(registrationKey) || "null")?.testerEmail);
    } catch {
      return false;
    }
  }

  function buildRegistrationGate() {
    if (document.getElementById("seatmapBetaRegistration")) return;
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div id="seatmapBetaRegistration" class="seatmap-beta-registration" role="dialog" aria-modal="true" aria-labelledby="seatmapBetaRegistrationTitle">
          <div class="seatmap-beta-registration-card">
            <div class="seatmap-beta-registration-head">
              <p class="seatmap-training-kicker">SeatMap beta</p>
              <h2 id="seatmapBetaRegistrationTitle" class="seatmap-beta-registration-title">${t("registrationTitle")}</h2>
              <p class="seatmap-beta-registration-copy">${t("registrationCopy")}</p>
            </div>
            <form class="seatmap-beta-registration-form">
              <div class="seatmap-beta-registration-grid">
                <label class="seatmap-beta-registration-label">Ваше имя
                  <input name="testerName" autocomplete="name" required>
                </label>
                <label class="seatmap-beta-registration-label">Email
                  <input name="testerEmail" type="email" autocomplete="email" required>
                </label>
                <label class="seatmap-beta-registration-label">Телефон
                  <input name="testerPhone" type="tel" autocomplete="tel" required>
                </label>
                <label class="seatmap-beta-registration-label">Название заведения
                  <input name="venueName" required>
                </label>
                <label class="seatmap-beta-registration-label">Тип заведения
                  <select name="venueType" required>
                    <option value="">Выберите тип</option>
                    <option>Restaurant</option>
                    <option>Cafe / Bar</option>
                    <option>Hotel restaurant</option>
                    <option>Beach club</option>
                    <option>Other</option>
                  </select>
                </label>
                <label class="seatmap-beta-registration-label">Город / страна
                  <input name="venueLocation" required>
                </label>
                <label class="seatmap-beta-registration-label">Количество столов
                  <input name="venueTables" type="number" min="1" inputmode="numeric" required>
                </label>
                <label class="seatmap-beta-registration-label">Ваш формат теста
                  <select name="testGoal" required>
                    <option value="">Выберите цель</option>
                    <option>Online reservations</option>
                    <option>Seat map and guest flow</option>
                    <option>Pro operations</option>
                    <option>CRM and management</option>
                  </select>
                </label>
              </div>
              <p class="seatmap-beta-registration-note">${t("registrationNote")}</p>
              <button class="seatmap-beta-registration-submit" type="submit">${t("registrationSubmit")}</button>
            </form>
          </div>
        </div>
      `
    );

    document.querySelector("#seatmapBetaRegistration form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      try {
        window.localStorage.setItem(registrationKey, JSON.stringify({ ...data, registeredAtUtc: new Date().toISOString() }));
      } catch {}
      document.getElementById("seatmapBetaRegistration")?.classList.remove("is-open");
      if (shouldAutoStart()) {
        hideEntryModal();
        window.sessionStorage.setItem(activeKey, "true");
        render();
      } else {
        showEntryModal();
      }
    });
  }

  function showRegistrationGate() {
    if (hasRegistration()) return false;
    buildRegistrationGate();
    hideEntryModal();
    document.getElementById("seatmapBetaRegistration")?.classList.add("is-open");
    return true;
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

  function readSignals() {
    try {
      return JSON.parse(window.sessionStorage.getItem(signalKey) || "{}") || {};
    } catch {
      return {};
    }
  }

  function writeSignals(signals) {
    try {
      window.sessionStorage.setItem(signalKey, JSON.stringify(signals));
    } catch {}
  }

  function resetSignals() {
    writeSignals({});
  }

  function markSignal(name, detail = true) {
    const signals = readSignals();
    signals[name] = detail;
    writeSignals(signals);
    if (window.sessionStorage.getItem(activeKey) === "true") {
      window.setTimeout(() => {
        render();
        autoAdvanceIfComplete();
      }, 120);
    }
  }

  function signalDone(name) {
    return Boolean(readSignals()[name]);
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
    markSignal("day");
    markSignal("time");
    markSignal("guests");
    markSignal("contacts");
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
    resetSignals();
    window.sessionStorage.setItem(activeKey, "true");
    window.sessionStorage.setItem(modeKey, nextMode);
    window.sessionStorage.setItem(stepKey, "0");
    if (!isReservation()) window.location.href = route(targetPath(nextMode, true));
    else render();
  }

  function startWithoutTraining(nextMode) {
    setVersion(nextMode);
    hideEntryModal();
    stop();
    window.location.href = route(targetPath(nextMode, false));
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
        title: "Выберите зону",
        copy: "Сначала выберите зону посадки: основной зал, сад или открытую террасу. Обучалка дождётся именно этого действия.",
        target: ["text:Зал|Сад|Тераса|Терраса|Indoor|Garden|Terrace|Open terrace|Пушачи|Основна"],
        signal: "area",
      },
      {
        title: "Выберите день",
        copy: "Теперь выберите дату резервации. После выбора дня я автоматически перейду к времени.",
        target: ["input[type='date']", "text:Сегодня|Tomorrow|Today|Днес|Утре"],
        signal: "day",
      },
      {
        title: "Выберите время",
        copy: "Выберите удобный слот времени. Например, 19:30 или любой доступный слот в интерфейсе.",
        target: ["input[type='time']", "text:19:00|19:30|20:00|18:30|час|time"],
        signal: "time",
      },
      {
        title: "Укажите количество гостей",
        copy: "Следующий шаг — количество людей. После этого должна появиться карта выбора столов.",
        target: ["input[type='number']", "select", "text:гостей|guests|души|people|2"],
        signal: "guests",
      },
      {
        title: "Откройте карту столов",
        copy: "Когда зона, день, время и гости выбраны, система показывает интерактивную карту. Я подсвечу её, как только она появится.",
        target: ["[data-table-id]", "[aria-label*='table' i]", "[aria-label*='стол' i]", "button[class*='table' i]", "text:6"],
        signal: "map",
      },
      {
        title: "Выбор стола",
        copy: "Теперь выберите конкретный столик на карте. Для демо хорошо подходит стол 6.",
        target: ["text:6", "[data-table-id='6']", "[aria-label*='6']", "[data-table-id]", "[aria-label*='table' i]", "[aria-label*='стол' i]", "button[class*='table' i]"],
        signal: "table",
      },
      {
        title: "Заполните данные гостя",
        copy: "После выбора стола заполните имя, телефон и email. Это финальная форма перед отправкой заявки.",
        target: ["input[type='text']", "input[type='tel']", "input[type='email']", "form"],
        signal: "contacts",
        actionLabel: "Заполнить демо-данные",
        action: fillReservationForm,
      },
      {
        title: "Отправка заявки",
        copy: "После отправки заявки появится окно с кнопкой открытия админ-панели. Бронь сохраняется только на этом устройстве.",
        target: ["text:Забронировать|Reserve|Book|Резервирай|Отправить|Submit", "button[type='submit']", "form button", "[class*='submit' i]", "[class*='primary' i]"],
        signal: "submit",
      },
      {
        title: "Проверка в админке",
        copy: "В админ-панели команда видит новую резервацию и может подтвердить приход гостя. Я могу открыть её сразу с демо-бронью.",
        target: ["#seatmapOpenAdminPanel", "text:Открыть админ|Open admin|Отвори админ", "#seatmapReservationAdminModal"],
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
        target: ["text:Прибыл|Arrived|Пристиг", "[class*='reservation' i]", "main", "#root"],
      },
    ];

    if (currentMode !== "pro") return basicSteps;

    return [
      ...basicSteps.slice(0, 8),
      {
        title: "Pro CRM",
        copy: "В Pro после прихода гостя можно запустить digital menu и заказ. Если брони нет, обучение подготовит тестовую бронь автоматически.",
        target: ["#seatmapProLauncher", "text:Открыть Pro order flow|Digital menu|Прибыл|Arrived|Пристиг", "[class*='reservation' i]", "main"],
        actionLabel: "Открыть Pro-flow",
        action: openProFlow,
      },
      {
        title: "Письмо гостю",
        copy: "Это имитация письма/сообщения для гостя. Кнопка открывает digital menu, где клиент выбирает блюда и напитки.",
        target: ["[data-pro-open-menu]", "text:Открыть digital menu|Open digital menu", "#seatmapProEmail"],
        actionLabel: "Открыть digital menu",
        action: () => clickFirst(["[data-pro-open-menu]", "#seatmapProLauncher"]) || openProFlow(),
      },
      {
        title: "Digital menu",
        copy: "Выберите несколько позиций. Цена уже в евро, а заказ попадёт в кухню, бар и на карту официанта.",
        target: ["text:Отправить заказ|Submit order", ".seatmap-pro-menu-item", "#seatmapProMenu", "[data-pro-menu-grid]"],
        actionLabel: "Создать демо-заказ",
        action: openProDashboardWithOrder,
      },
      {
        title: "Кухня и бар",
        copy: "Слева кухня и бар принимают позиции по отделам. Нажмите «Отметить готово», чтобы блюдо подсветилось у официанта.",
        target: ["[data-pro-ready]", "text:Отметить готово|Mark ready", "[data-pro-kitchen]", "#seatmapProShell"],
        actionLabel: "Показать заказ",
        action: openProDashboardWithOrder,
      },
      {
        title: "Карта официанта",
        copy: "Справа используется та же логика столов, что и в резервациях. Когда кухня отмечает готовность, стол подсвечивается зелёным.",
        target: [".seatmap-pro-table.has-ready", ".seatmap-pro-table.has-order", "[data-pro-table-map]"],
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
              <div class="seatmap-training-wait" hidden></div>
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
    layer.querySelector("[data-training-prev]").addEventListener("click", () => {
      if (layer.dataset.trainingView === "launch") {
        layer.classList.remove("is-open");
        layer.setAttribute("aria-hidden", "true");
        showEntryModal();
        return;
      }
      previousStep();
    });
    layer.querySelector("[data-training-next]").addEventListener("click", () => {
      if (layer.dataset.trainingView === "chooser" || layer.dataset.trainingView === "launch") start(mode());
      else nextStep();
    });
    layer.querySelector("[data-training-action]").addEventListener("click", runStepAction);
    layer.querySelectorAll("[data-training-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.trainingChoice === "with") start(button.dataset.trainingMode);
        else if (button.dataset.trainingChoice === "without") startWithoutTraining(button.dataset.trainingMode);
        else start(button.dataset.trainingMode);
      });
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
    document.querySelectorAll(".seatmap-training-entry-action").forEach((node) => node.remove());
  }

  function bindVersionChoice() {
    document.addEventListener(
      "click",
      (event) => {
        const button = event.target?.closest?.("[data-seatmap-version]");
        if (!button || !document.getElementById("seatmapEntryModal")?.contains(button)) return;
        const nextMode = button.dataset.seatmapVersion === "pro" ? "pro" : "basic";
        event.preventDefault();
        event.stopImmediatePropagation();
        showLaunchChoice(nextMode);
      },
      true
    );
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
      if (String(selector).startsWith("text:")) {
        const visibleByText = findTextTarget(String(selector).slice(5));
        if (visibleByText) return visibleByText;
        continue;
      }
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

  function isVisible(node) {
    if (!node) return false;
    const rect = node.getBoundingClientRect();
    const style = window.getComputedStyle(node);
    return rect.width > 4 && rect.height > 4 && style.visibility !== "hidden" && style.display !== "none";
  }

  function findTextTarget(pattern) {
    const parts = String(pattern || "")
      .split("|")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
    if (!parts.length) return null;
    const candidates = Array.from(
      document.querySelectorAll("button, a, input[type='button'], input[type='submit'], [role='button'], [aria-label]")
    );
    return candidates.find((node) => {
      if (!isVisible(node)) return false;
      const text = `${node.textContent || ""} ${node.getAttribute("aria-label") || ""} ${node.value || ""}`.trim().toLowerCase();
      return parts.some((part) => text.includes(part));
    });
  }

  function hasContactValues() {
    const inputs = Array.from(document.querySelectorAll("input"));
    const hasEmail = inputs.some((input) => input.type === "email" && /@/.test(input.value || ""));
    const hasPhone = inputs.some((input) => input.type === "tel" && String(input.value || "").replace(/\D/g, "").length >= 6);
    const hasName = inputs.some((input) => {
      const type = input.type || "text";
      return type === "text" && String(input.value || "").trim().length >= 2;
    });
    return hasEmail && hasPhone && hasName;
  }

  function hasTableMap() {
    return Boolean(findTarget(["[data-table-id]", "[aria-label*='table' i]", "[aria-label*='стол' i]", "button[class*='table' i]", "text:6"]));
  }

  function isStepComplete(step) {
    if (!step?.signal) return true;
    if (step.signal === "map") return signalDone("map") || hasTableMap();
    if (step.signal === "contacts") return signalDone("contacts") || hasContactValues();
    return signalDone(step.signal);
  }

  function autoAdvanceIfComplete() {
    const { steps, index, step } = currentStep();
    if (!step || !isStepComplete(step) || index >= steps.length - 1) return;
    window.setTimeout(() => {
      const current = currentStep();
      if (current.index === index && isStepComplete(current.step)) nextStep();
    }, 420);
  }

  function describeNode(node) {
    return `${node?.textContent || ""} ${node?.getAttribute?.("aria-label") || ""} ${node?.value || ""}`.toLowerCase();
  }

  function classifyClick(node) {
    const clickable = node?.closest?.("button, a, [role='button'], label, [data-table-id], [aria-label]") || node;
    if (!clickable || clickable.closest(".seatmap-training-layer") || clickable.closest(".seatmap-beta-registration")) return;
    const text = describeNode(clickable);
    const active = currentStep().step?.signal;

    if (active === "area" && /зал|зон|сад|терас|terrace|garden|indoor|outside|open|пушачи|основна/.test(text)) markSignal("area", text);
    if (active === "day" && /(today|tomorrow|днес|утре|сегодня|\d{1,2}[./-]\d{1,2})/.test(text)) markSignal("day", text);
    if (active === "time" && /(\d{1,2}:\d{2}|час|time)/.test(text)) markSignal("time", text);
    if (active === "guests" && /(guest|people|гост|душ|човек|\b[1-9]\b)/.test(text)) markSignal("guests", text);
    if (active === "table" && (/table|стол|маса/.test(text) || /^[\sT]*\d{1,2}[A]?\s*$/i.test(text))) markSignal("table", text);
    if (active === "submit" && /(заброни|reserve|book|submit|отправ|резервира)/.test(text)) markSignal("submit", text);
  }

  function classifyInput(node) {
    if (!node || node.closest?.(".seatmap-beta-registration")) return;
    const active = currentStep().step?.signal;
    const value = String(node.value || "").trim();
    if (!value) return;
    if (active === "day" && node.type === "date") markSignal("day", value);
    if (active === "time" && node.type === "time") markSignal("time", value);
    if (active === "guests" && (node.type === "number" || /guest|people|гост|душ/i.test(node.name || node.getAttribute("aria-label") || ""))) {
      markSignal("guests", value);
    }
    if (active === "contacts" && hasContactValues()) markSignal("contacts");
  }

  function bindTrainingTracker() {
    document.addEventListener("click", (event) => classifyClick(event.target), true);
    document.addEventListener("input", (event) => classifyInput(event.target), true);
    document.addEventListener("change", (event) => classifyInput(event.target), true);
    document.addEventListener(
      "submit",
      () => {
        if (currentStep().step?.signal === "submit") markSignal("submit");
      },
      true
    );
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
    const modes = layer.querySelector(".seatmap-training-modes");
    modes.hidden = false;
    modes.innerHTML = `
      <button class="seatmap-training-mode" type="button" data-training-mode="basic">
        <strong>${t("basicTitle")}</strong>
        <span>${t("basicText")}</span>
      </button>
      <button class="seatmap-training-mode" type="button" data-training-mode="pro">
        <strong>${t("proTitle")}</strong>
        <span>${t("proText")}</span>
      </button>
    `;
    modes.querySelectorAll("[data-training-mode]").forEach((button) => {
      button.addEventListener("click", () => start(button.dataset.trainingMode));
    });
    layer.querySelector(".seatmap-training-progress").innerHTML = "";
    layer.querySelector(".seatmap-training-status").textContent = "";
    layer.querySelector("[data-training-prev]").disabled = true;
    layer.querySelector("[data-training-action]").hidden = true;
    layer.querySelector("[data-training-next]").textContent = t("next");
    layer.querySelector("[data-training-next]").disabled = false;
    modes.querySelectorAll("[data-training-mode]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.trainingMode === mode());
    });
    layer.querySelector(".seatmap-training-spotlight").classList.remove("is-visible");
  }

  function showLaunchChoice(nextMode) {
    hideEntryModal();
    buildLayer();
    window.sessionStorage.setItem(modeKey, nextMode);
    const layer = document.getElementById("seatmapTrainingLayer");
    layer.dataset.trainingView = "launch";
    layer.classList.add("is-open");
    layer.setAttribute("aria-hidden", "false");
    layer.querySelector(".seatmap-training-title").textContent = interpolate(t("launchTitle"), { mode: nextMode === "pro" ? "Pro" : "Basic" });
    layer.querySelector(".seatmap-training-copy").textContent = t("launchCopy");
    const note = layer.querySelector(".seatmap-training-note");
    note.hidden = false;
    note.textContent = t("chooseNote");
    const modes = layer.querySelector(".seatmap-training-modes");
    modes.hidden = false;
    modes.innerHTML = `
      <button class="seatmap-training-mode" type="button" data-training-mode="${nextMode}" data-training-choice="without">
        <strong>${t("withoutTraining")}</strong>
        <span>${t("withoutTrainingText")}</span>
      </button>
      <button class="seatmap-training-mode is-primary" type="button" data-training-mode="${nextMode}" data-training-choice="with">
        <strong>${t("withTraining")}</strong>
        <span>${t("withTrainingText")}</span>
      </button>
    `;
    modes.querySelectorAll("[data-training-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.trainingChoice === "with") start(button.dataset.trainingMode);
        else startWithoutTraining(button.dataset.trainingMode);
      });
    });
    layer.querySelector(".seatmap-training-progress").innerHTML = "";
    layer.querySelector(".seatmap-training-status").textContent = nextMode === "pro" ? "Pro" : "Basic";
    layer.querySelector("[data-training-prev]").disabled = false;
    layer.querySelector("[data-training-prev]").textContent = t("prev");
    layer.querySelector("[data-training-action]").hidden = true;
    layer.querySelector("[data-training-next]").textContent = t("withTraining");
    layer.querySelector("[data-training-next]").disabled = false;
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
    if (step.signal === "map" && hasTableMap() && !signalDone("map")) {
      const signals = readSignals();
      signals.map = true;
      writeSignals(signals);
    }
    const complete = isStepComplete(step);
    const wait = layer.querySelector(".seatmap-training-wait");
    wait.hidden = !step.signal;
    wait.textContent = complete ? t("doneAction") : t("waitAction");
    wait.classList.toggle("is-complete", complete);
    layer.querySelector(".seatmap-training-card").classList.toggle("is-waiting", Boolean(step.signal && !complete));
    layer.querySelector(".seatmap-training-card").classList.toggle("is-complete", Boolean(step.signal && complete));
    layer.querySelector(".seatmap-training-note").hidden = true;
    layer.querySelector(".seatmap-training-modes").hidden = true;
    layer.querySelector("[data-training-prev]").disabled = index === 0;

    const action = layer.querySelector("[data-training-action]");
    action.hidden = !step.actionLabel;
    action.textContent = step.actionLabel || t("actionFallback");

    const nextButton = layer.querySelector("[data-training-next]");
    nextButton.textContent = index === steps.length - 1 ? t("finish") : t("next");
    nextButton.disabled = Boolean(step.signal && !complete);
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
    buildRegistrationGate();
    addLauncher();
    patchEntryModal();
    bindVersionChoice();
    bindTrainingTracker();
    new MutationObserver(() => {
      patchEntryModal();
      if (window.sessionStorage.getItem(activeKey) === "true") positionSpotlight();
    }).observe(document.body, { childList: true, subtree: true });

    window.addEventListener("resize", positionSpotlight);
    window.addEventListener("scroll", positionSpotlight, true);

    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("version") === "basic" ? "basic" : params.get("version") === "pro" ? "pro" : "";
    if (requestedMode) window.sessionStorage.setItem(modeKey, requestedMode);
    if (showRegistrationGate()) return;
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
