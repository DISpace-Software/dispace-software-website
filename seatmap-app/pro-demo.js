(function () {
  const stateKey = "seatmap-demo-state-v3";
  const versionKey = "seatmap-demo-version";
  const ttlMs = 3 * 60 * 60 * 1000;
  const demoAdmin = { id: 1, name: "Demo Admin", email: "admin@seatmap.local", role: "Owner" };

  const tableLayout = {
    indoor: [
      { id: "1", x: 83, y: 12, seats: 4, wide: true },
      { id: "2", x: 83, y: 22, seats: 4, wide: true },
      { id: "3", x: 83, y: 32, seats: 4, wide: true },
      { id: "4", x: 83, y: 42, seats: 4, wide: true },
      { id: "5", x: 51, y: 22, seats: 6, wide: true },
      { id: "6", x: 51, y: 35, seats: 6, wide: true },
      { id: "7", x: 16, y: 10, seats: 4, wide: true },
      { id: "8", x: 16, y: 20, seats: 6, wide: true },
      { id: "9", x: 16, y: 30, seats: 6, wide: true },
      { id: "10", x: 16, y: 40, seats: 6, wide: true },
      { id: "11", x: 16, y: 50, seats: 6, wide: true },
      { id: "20", x: 82, y: 60, seats: 4, wide: true },
      { id: "21", x: 82, y: 70, seats: 4, wide: true },
      { id: "22", x: 82, y: 80, seats: 4, wide: true },
      { id: "23", x: 82, y: 90, seats: 4, wide: true },
      { id: "24", x: 53, y: 65, seats: 6, wide: true },
      { id: "25", x: 54, y: 78, seats: 6 },
      { id: "26", x: 55, y: 90, seats: 4, wide: true },
      { id: "27", x: 35, y: 92, seats: 4, wide: true },
      { id: "28", x: 16, y: 90, seats: 6, wide: true },
      { id: "29", x: 16, y: 80, seats: 6, wide: true },
    ],
    garden: [
      { id: "42", x: 17, y: 22, seats: 4 },
      { id: "43", x: 17, y: 42, seats: 4 },
      { id: "44", x: 17, y: 62, seats: 4 },
      { id: "45", x: 17, y: 82, seats: 4 },
      { id: "38", x: 38, y: 24, seats: 4 },
      { id: "39", x: 38, y: 44, seats: 4 },
      { id: "40", x: 38, y: 64, seats: 4 },
      { id: "41", x: 38, y: 84, seats: 4 },
      { id: "34", x: 59, y: 24, seats: 4 },
      { id: "35", x: 59, y: 44, seats: 4 },
      { id: "36", x: 59, y: 64, seats: 4 },
      { id: "37", x: 59, y: 84, seats: 4 },
      { id: "30", x: 78, y: 22, seats: 4 },
      { id: "31", x: 78, y: 42, seats: 4 },
      { id: "32", x: 78, y: 62, seats: 4 },
      { id: "33", x: 78, y: 82, seats: 4 },
      { id: "34A", x: 58, y: 10, seats: 2, special: true },
      { id: "30A", x: 75, y: 10, seats: 2, special: true },
      { id: "45A", x: 28, y: 93, seats: 2, special: true },
    ],
    openTerrace: [
      { id: "46", x: 34, y: 40, seats: 4 },
      { id: "47", x: 66, y: 40, seats: 4 },
      { id: "48", x: 34, y: 68, seats: 2, special: true },
      { id: "49", x: 66, y: 68, seats: 2, special: true },
    ],
  };

  const fallbackMenu = [
    ["Burrata con Pomodorini", "Creamy burrata, cherry tomatoes, basil oil.", "Starters", 28, "./menu-items/burrata-con-pomodorini.jpg"],
    ["Vitello Tonnato", "Slow cooked veal, tuna sauce and capers.", "Starters", 31, "./menu-items/vitello-tonnato.jpg"],
    ["Carpaccio di Manzo", "Beef carpaccio, arugula and parmesan.", "Starters", 32, "./menu-items/carpaccio-di-manzo.jpg"],
    ["Pizza Prosciutto e Funghi", "Tomato, mozzarella, prosciutto cotto, mushrooms.", "Pizza", 24, "./menu-items/pizza-prosciutto-funghi.jpg"],
    ["Pizza Diavola", "Tomato, mozzarella, spicy salami and chili oil.", "Pizza", 25, "./menu-items/pizza-diavola.jpg"],
    ["Tagliatelle al Tartufo", "Fresh pasta, parmesan cream and black truffle.", "Mains", 36, "./menu-items/tagliatelle-tartufo.jpg"],
    ["Spaghetti Frutti di Mare", "Mussels, shrimp, calamari and cherry tomatoes.", "Mains", 38, "./menu-items/spaghetti-frutti-di-mare.jpg"],
    ["Risotto ai Porcini", "Carnaroli rice, porcini mushrooms and parmesan.", "Mains", 34, "./menu-items/risotto-porcini.jpg"],
    ["Grilled Sea Bass", "Sea bass fillet, grilled vegetables and lemon oil.", "Mains", 42, "./menu-items/grilled-sea-bass.jpg"],
    ["Tiramisu Classico", "Mascarpone cream, espresso, savoiardi and cocoa.", "Desserts", 18, "./menu-items/tiramisu-classico.jpg"],
    ["Aperol Spritz", "Aperol, prosecco, soda and orange.", "Drinks", 16, "./menu-items/aperol-spritz.jpg"],
    ["Hugo Spritz", "Prosecco, elderflower, mint, lime and soda.", "Drinks", 16, "./menu-items/hugo-spritz.jpg"],
    ["Italian Lemonade", "Fresh lemon, basil, soda and cane sugar.", "Drinks", 10, "./menu-items/italian-lemonade.jpg"],
    ["Espresso Martini", "Vodka, espresso, coffee liqueur and vanilla.", "Drinks", 18, "./menu-items/espresso-martini.jpg"],
    ["Acqua Panna", "Still mineral water.", "Drinks", 8, "./menu-items/acqua-panna.jpg"],
  ].map((item, index) => ({
    id: index + 1,
    name: item[0],
    description: item[1],
    category: item[2],
    price: item[3],
    imageUrl: item[4],
  }));

  function isPro() {
    const params = new URLSearchParams(window.location.search);
    return params.get("version") === "pro" || window.localStorage.getItem(versionKey) === "pro";
  }

  function setAdminSession() {
    try {
      window.sessionStorage.setItem("admin-token", "seatmap-demo-token");
      window.sessionStorage.setItem("admin-user", JSON.stringify(demoAdmin));
    } catch {}
  }

  function readState() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(stateKey) || "{}");
      return {
        reservations: Array.isArray(parsed.reservations) ? parsed.reservations : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        ...parsed,
      };
    } catch {
      return { reservations: [], orders: [] };
    }
  }

  function writeState(state) {
    try {
      window.localStorage.setItem(stateKey, JSON.stringify({ ...state, savedAtUtc: new Date().toISOString() }));
    } catch {}
  }

  function recordTime(record) {
    const value = Date.parse(record?.createdAtUtc || record?.arrivedAtUtc || record?.updatedAtUtc || "");
    return Number.isFinite(value) ? value : Date.now();
  }

  function purgeExpired() {
    const state = readState();
    const cutoff = Date.now() - ttlMs;
    const reservations = state.reservations.filter((item) => recordTime(item) >= cutoff);
    const orders = state.orders.filter((item) => recordTime(item) >= cutoff);
    if (reservations.length !== state.reservations.length || orders.length !== state.orders.length) {
      writeState({ ...state, reservations, orders });
    }
  }

  function normalizeTableId(reservation) {
    const raw = reservation?.tableId || reservation?.tableIds?.[0] || "5";
    return String(raw).trim().replace(/^T/i, "") || "5";
  }

  function normalizeAreaId(value) {
    const text = String(value || "").trim();
    if (["indoor", "garden", "openTerrace"].includes(text)) return text;
    if (/open|откр|вън|outside/i.test(text)) return "openTerrace";
    if (/garden|terrace|терас|пуш/i.test(text)) return "garden";
    return "indoor";
  }

  function areaForTable(tableId) {
    const id = String(tableId || "").trim().replace(/^T/i, "");
    return Object.entries(tableLayout).find(([, tables]) => tables.some((table) => table.id === id))?.[0] || "indoor";
  }

  function orderAreaFromReservation(reservation) {
    return normalizeAreaId(reservation.areaId || reservation.area || reservation.areaName || areaForTable(normalizeTableId(reservation)));
  }

  function latestArrivedReservation() {
    const state = readState();
    return state.reservations
      .filter((item) => item.isArrived || item.arrivedAtUtc)
      .sort((a, b) => recordTime(b) - recordTime(a))[0];
  }

  function money(value) {
    return `€${Number(value || 0).toFixed(0)}`;
  }

  function openLayer(element) {
    if (!element) return;
    element.dataset.previousFocusId = document.activeElement?.id || "";
    element.setAttribute("aria-hidden", "false");
    element.classList.add("is-open");
    window.requestAnimationFrame(() => {
      const focusTarget = element.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      focusTarget?.focus({ preventScroll: true });
    });
  }

  function closeLayer(element, nextFocus) {
    if (!element) return;
    if (element.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    element.classList.remove("is-open");
    element.setAttribute("aria-hidden", "true");
    window.requestAnimationFrame(() => {
      if (nextFocus && document.contains(nextFocus)) {
        nextFocus.focus({ preventScroll: true });
      }
    });
  }

  function buildShell() {
    if (document.getElementById("seatmapProShell")) return;
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div id="seatmapProEmail" class="seatmap-pro-email" aria-hidden="true">
          <div class="seatmap-pro-email-card">
            <div class="seatmap-pro-email-top">
              <div><strong>From:</strong> SeatMap Restaurant OS</div>
              <div><strong>To:</strong> Guest at table <span data-pro-email-table>T5</span></div>
              <div><strong>Subject:</strong> Digital menu and table order</div>
            </div>
            <div class="seatmap-pro-email-body">
              <p>Добре дошли. Вашата резервация е маркирана като пристигнала.</p>
              <p>Можете да отворите digital menu, да изберете ястия и напитки, а поръчката веднага ще се появи при кухнята, бара и официанта.</p>
            </div>
            <div class="seatmap-pro-email-actions">
              <button class="seatmap-pro-button" type="button" data-pro-open-menu>Открыть digital menu</button>
              <button class="seatmap-pro-ghost" type="button" data-pro-close-email>Закрыть</button>
            </div>
          </div>
        </div>
        <div id="seatmapProMenu" class="seatmap-pro-menu" aria-hidden="true">
          <div class="seatmap-pro-menu-card">
            <div class="seatmap-pro-head">
              <div>
                <p class="seatmap-pro-kicker">Digital menu</p>
                <h2 class="seatmap-pro-title">Заказ гостя</h2>
                <p class="seatmap-pro-copy">Выберите несколько позиций. После отправки заказ появится в Pro dashboard.</p>
              </div>
              <button class="seatmap-pro-close" type="button" data-pro-close-menu>×</button>
            </div>
            <div class="seatmap-pro-menu-grid" data-pro-menu-grid></div>
            <div class="seatmap-pro-menu-bottom">
              <strong data-pro-menu-total>€0</strong>
              <button class="seatmap-pro-button" type="button" data-pro-submit-order>Отправить заказ</button>
            </div>
          </div>
        </div>
        <div id="seatmapProShell" class="seatmap-pro-shell" aria-hidden="true">
          <div class="seatmap-pro-stage">
            <section class="seatmap-pro-panel">
              <div class="seatmap-pro-head">
                <div>
                  <p class="seatmap-pro-kicker">SeatMap Pro OS</p>
                  <h2 class="seatmap-pro-title">Kitchen, bar and waiter flow</h2>
                  <p class="seatmap-pro-copy">Заказы живут только на этом устройстве и автоматически очищаются через 3 часа.</p>
                </div>
                <button class="seatmap-pro-close" type="button" data-pro-close-shell>×</button>
              </div>
              <div class="seatmap-pro-board">
                <div class="seatmap-pro-lane">
                  <h3>Кухня</h3>
                  <div data-pro-kitchen></div>
                </div>
                <div class="seatmap-pro-lane">
                  <h3>Бар</h3>
                  <div data-pro-bar></div>
                </div>
              </div>
            </section>
            <section class="seatmap-pro-panel seatmap-pro-map">
              <div>
                <p class="seatmap-pro-kicker">Waiter map</p>
                <h3>Карта столов с заказами</h3>
              </div>
              <div class="seatmap-pro-table-map" data-pro-table-map></div>
            </section>
          </div>
        </div>
      `
    );
  }

  async function loadMenu() {
    try {
      const response = await fetch("/api/menu");
      if (!response.ok) return fallbackMenu;
      const data = await response.json();
      return Array.isArray(data) && data.length ? data : fallbackMenu;
    } catch {
      return fallbackMenu;
    }
  }

  function openEmail(reservation) {
    if (!isPro()) return;
    buildShell();
    window.seatmapProReservation = reservation || latestArrivedReservation() || readState().reservations[0] || {};
    document.querySelector("[data-pro-email-table]").textContent = normalizeTableId(window.seatmapProReservation);
    openLayer(document.getElementById("seatmapProEmail"));
  }

  async function openMenu() {
    buildShell();
    const modal = document.getElementById("seatmapProMenu");
    const grid = modal.querySelector("[data-pro-menu-grid]");
    const total = modal.querySelector("[data-pro-menu-total]");
    const menu = await loadMenu();
    const selected = new Map();

    function renderTotal() {
      const sum = Array.from(selected.values()).reduce((acc, item) => acc + Number(item.price || 0) * item.qty, 0);
      total.textContent = money(sum);
    }

    grid.innerHTML = menu
      .map(
        (item) => `
          <button class="seatmap-pro-menu-item" type="button" data-menu-id="${item.id}">
            <img src="${item.imageUrl || "./menu-items/burrata-con-pomodorini.jpg"}" alt="">
            <span class="seatmap-pro-qty" data-menu-qty="${item.id}">0</span>
            <div class="seatmap-pro-menu-info">
              <h4>${item.name || item.nameRu || item.nameBg}</h4>
              <p>${item.description || item.descriptionRu || item.descriptionBg || ""}</p>
              <strong>${money(item.price)}</strong>
              <span class="seatmap-pro-menu-pick">Добавить</span>
            </div>
          </button>
        `
      )
      .join("");

    grid.querySelectorAll(".seatmap-pro-menu-item").forEach((card) => {
      card.addEventListener("click", () => {
        const item = menu.find((entry) => String(entry.id) === String(card.dataset.menuId));
        if (!item) return;
        const current = selected.get(item.id) || { ...item, qty: 0 };
        current.qty += 1;
        selected.set(item.id, current);
        card.classList.add("is-selected");
        const qty = card.querySelector("[data-menu-qty]");
        const pick = card.querySelector(".seatmap-pro-menu-pick");
        if (qty) qty.textContent = current.qty;
        if (pick) pick.textContent = `Добавлено x${current.qty}`;
        renderTotal();
      });
    });

    modal.querySelector("[data-pro-submit-order]").onclick = async () => {
      if (!selected.size) return;
      const reservation = window.seatmapProReservation || latestArrivedReservation() || {};
      const items = Array.from(selected.values()).map((item) => ({
        id: item.id,
        name: item.name || item.nameRu || item.nameBg,
        category: item.category,
        price: Number(item.price || 0),
        qty: item.qty,
      }));
      const order = {
        reservationId: reservation.id || null,
        guestName: reservation.guestName || reservation.name || "Demo Guest",
        tableId: normalizeTableId(reservation),
        areaId: orderAreaFromReservation(reservation),
        items,
        total: items.reduce((acc, item) => acc + item.price * item.qty, 0),
      };
      await fetch("/api/dining-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      closeLayer(modal);
      openDashboard();
    };

    renderTotal();
    openLayer(modal);
  }

  function markOrderItemsReady(orderId, department) {
    const state = readState();
    const order = state.orders.find((item) => Number(item.id) === Number(orderId));
    if (!order) return;
    const isDrink = (item) => String(item.category || "").toLowerCase().includes("drink");
    order.items = (order.items || []).map((item) => {
      const belongsToDepartment = department === "bar" ? isDrink(item) : !isDrink(item);
      return belongsToDepartment ? { ...item, status: "Ready", readyAtUtc: new Date().toISOString() } : item;
    });
    order.updatedAtUtc = new Date().toISOString();
    writeState(state);
    renderDashboard();
  }

  function ticket(order, filter, department) {
    const items = (order.items || []).filter((item) => !filter || filter(item));
    if (!items.length) return "";
    const allReady = items.every((item) => item.status === "Ready");
    return `
      <article class="seatmap-pro-ticket ${allReady ? "is-ready" : ""}">
        <strong>${order.tableId || "T5"} · ${order.guestName || "Guest"}</strong>
        <small>${new Date(order.createdAtUtc || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · ${money(order.total)}</small>
        <div class="seatmap-pro-items">
          ${items.map((item) => `<span class="${item.status === "Ready" ? "is-ready" : ""}">${item.qty || 1}× ${item.name}${item.status === "Ready" ? " · готово" : ""}</span>`).join("")}
        </div>
        <button class="seatmap-pro-ready" type="button" data-pro-ready="${order.id}" data-pro-department="${department}" ${allReady ? "disabled" : ""}>
          ${allReady ? "Готово" : "Отметить готово"}
        </button>
      </article>
    `;
  }

  function renderDashboard() {
    buildShell();
    purgeExpired();
    const orders = readState().orders || [];
    const kitchen = document.querySelector("[data-pro-kitchen]");
    const bar = document.querySelector("[data-pro-bar]");
    const map = document.querySelector("[data-pro-table-map]");
    const isDrink = (item) => String(item.category || "").toLowerCase().includes("drink");
    const activeArea =
      normalizeAreaId(orders.find((order) => order.areaId)?.areaId || orderAreaFromReservation(latestArrivedReservation() || {}));
    const tables = tableLayout[activeArea] || tableLayout.indoor;

    kitchen.innerHTML = orders.map((order) => ticket(order, (item) => !isDrink(item), "kitchen")).join("") || `<p class="seatmap-pro-muted">Пока нет заказов кухни.</p>`;
    bar.innerHTML = orders.map((order) => ticket(order, isDrink, "bar")).join("") || `<p class="seatmap-pro-muted">Пока нет напитков для бара.</p>`;
    map.dataset.area = activeArea;
    map.innerHTML = tables
      .map((table) => {
        const tableOrders = orders.filter((order) => normalizeAreaId(order.areaId) === activeArea && String(order.tableId || "5") === table.id);
        const readyItems = tableOrders.flatMap((order) => (order.items || []).filter((item) => item.status === "Ready"));
        const total = tableOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
        return `
          <div class="seatmap-pro-table ${table.special ? "is-special" : ""} ${table.wide ? "is-wide" : ""} ${tableOrders.length ? "has-order" : ""} ${readyItems.length ? "has-ready" : ""}" style="left:${table.x}%;top:${table.y}%">
            <span>${table.id}</span>
            ${readyItems.length ? `<small>${readyItems.length} готово</small>` : tableOrders.length ? `<small>${money(total)}</small>` : `<small>${table.seats} места</small>`}
          </div>
        `;
      })
      .join("");
    document.querySelectorAll("[data-pro-ready]").forEach((button) => {
      button.addEventListener("click", () => markOrderItemsReady(button.dataset.proReady, button.dataset.proDepartment));
    });
  }

  function openDashboard() {
    buildShell();
    renderDashboard();
    openLayer(document.getElementById("seatmapProShell"));
  }

  function bindShellEvents() {
    buildShell();
    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-pro-close-email]")) closeLayer(document.getElementById("seatmapProEmail"));
      if (event.target.closest("[data-pro-open-menu]")) {
        closeLayer(document.getElementById("seatmapProEmail"));
        openMenu();
      }
      if (event.target.closest("[data-pro-close-menu]")) closeLayer(document.getElementById("seatmapProMenu"));
      if (event.target.closest("[data-pro-close-shell]")) closeLayer(document.getElementById("seatmapProShell"));
    });
  }

  function patchEntryButtons() {
    document.querySelectorAll("[data-seatmap-version='pro']").forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          window.localStorage.setItem(versionKey, "pro");
          window.sessionStorage.setItem("seatmap-admin-mode", "pro");
          setAdminSession();
          window.setTimeout(() => {
            if (window.location.pathname.includes("/admin")) window.location.href = "/seatmap-app/reservation?version=pro";
          }, 0);
        },
        true
      );
    });
  }

  function watchArriveClicks() {
    document.addEventListener(
      "click",
      (event) => {
        if (!isPro() || !window.location.pathname.includes("/admin")) return;
        const text = (event.target?.textContent || "").toLowerCase();
        if (!/arriv|пристиг|прибыл|дош/.test(text)) return;
        window.setTimeout(() => {
          const reservation = latestArrivedReservation();
          if (reservation) openEmail(reservation);
        }, 250);
      },
      true
    );
  }

  function addAdminLauncher() {
    if (!isPro() || !window.location.pathname.includes("/admin")) return;
    setAdminSession();
    const mount = () => {
      if (document.getElementById("seatmapProLauncher")) return;
      const root = document.getElementById("root");
      if (!root) return;
      const launcher = document.createElement("button");
      launcher.id = "seatmapProLauncher";
      launcher.className = "seatmap-pro-button";
      launcher.type = "button";
      launcher.textContent = "Открыть Pro order flow";
      launcher.style.position = "fixed";
      launcher.style.right = "18px";
      launcher.style.bottom = "18px";
      launcher.style.zIndex = "9997";
      launcher.addEventListener("click", () => {
        const reservation = latestArrivedReservation() || readState().reservations[0];
        if (reservation) openEmail(reservation);
        else openDashboard();
      });
      document.body.appendChild(launcher);
    };
    mount();
    new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    purgeExpired();
    bindShellEvents();
    patchEntryButtons();
    watchArriveClicks();
    addAdminLauncher();
    window.addEventListener("seatmap:order-created", renderDashboard);
    window.addEventListener("storage", renderDashboard);
    window.setInterval(purgeExpired, 60 * 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
