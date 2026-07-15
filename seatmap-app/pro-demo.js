(function () {
  const stateKey = "seatmap-demo-state-v3";
  const versionKey = "seatmap-demo-version";
  const ttlMs = 3 * 60 * 60 * 1000;
  const demoAdmin = { id: 1, name: "Demo Admin", email: "admin@seatmap.local", role: "Owner" };

  const demoTables = [
    { id: "T1", x: 10, y: 16 },
    { id: "T2", x: 34, y: 18 },
    { id: "T3", x: 62, y: 15 },
    { id: "T4", x: 18, y: 46 },
    { id: "T5", x: 48, y: 48 },
    { id: "T6", x: 72, y: 48 },
    { id: "T7", x: 28, y: 72 },
    { id: "T8", x: 58, y: 73 },
  ];

  const fallbackMenu = [
    ["Burrata con Pomodorini", "Creamy burrata, cherry tomatoes, basil oil.", "Starters", 28, "./seatmap-terrace-restaurant.png"],
    ["Vitello Tonnato", "Slow cooked veal, tuna sauce and capers.", "Starters", 31, "./seatmap-open-terrace.png"],
    ["Carpaccio di Manzo", "Beef carpaccio, arugula and parmesan.", "Starters", 32, "./seatmap-hero-restaurant.png"],
    ["Pizza Prosciutto e Funghi", "Tomato, mozzarella, prosciutto cotto, mushrooms.", "Pizza", 24, "./seatmap-terrace-restaurant.png"],
    ["Pizza Diavola", "Tomato, mozzarella, spicy salami and chili oil.", "Pizza", 25, "./seatmap-open-terrace.png"],
    ["Tagliatelle al Tartufo", "Fresh pasta, parmesan cream and black truffle.", "Mains", 36, "./seatmap-hero-restaurant.png"],
    ["Spaghetti Frutti di Mare", "Mussels, shrimp, calamari and cherry tomatoes.", "Mains", 38, "./seatmap-terrace-restaurant.png"],
    ["Risotto ai Porcini", "Carnaroli rice, porcini mushrooms and parmesan.", "Mains", 34, "./seatmap-open-terrace.png"],
    ["Grilled Sea Bass", "Sea bass fillet, grilled vegetables and lemon oil.", "Mains", 42, "./seatmap-hero-restaurant.png"],
    ["Tiramisu Classico", "Mascarpone cream, espresso, savoiardi and cocoa.", "Desserts", 18, "./seatmap-open-terrace.png"],
    ["Aperol Spritz", "Aperol, prosecco, soda and orange.", "Drinks", 16, "./seatmap-terrace-restaurant.png"],
    ["Hugo Spritz", "Prosecco, elderflower, mint, lime and soda.", "Drinks", 16, "./seatmap-open-terrace.png"],
    ["Italian Lemonade", "Fresh lemon, basil, soda and cane sugar.", "Drinks", 10, "./seatmap-hero-restaurant.png"],
    ["Espresso Martini", "Vodka, espresso, coffee liqueur and vanilla.", "Drinks", 18, "./seatmap-terrace-restaurant.png"],
    ["Acqua Panna", "Still mineral water.", "Drinks", 8, "./seatmap-open-terrace.png"],
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
    const raw = reservation?.tableId || reservation?.tableIds?.[0] || "T5";
    const text = String(raw).toUpperCase();
    if (text.startsWith("T")) return text;
    return `T${Math.max(1, Math.min(8, Number(text.replace(/\D/g, "")) || 5))}`;
  }

  function latestArrivedReservation() {
    const state = readState();
    return state.reservations
      .filter((item) => item.isArrived || item.arrivedAtUtc)
      .sort((a, b) => recordTime(b) - recordTime(a))[0];
  }

  function money(value) {
    return `${Number(value || 0).toFixed(0)} лв.`;
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
              <strong data-pro-menu-total>0 лв.</strong>
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
    document.getElementById("seatmapProEmail").classList.add("is-open");
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
          <article class="seatmap-pro-menu-item">
            <img src="${item.imageUrl || "./seatmap-hero-restaurant.png"}" alt="">
            <div class="seatmap-pro-menu-info">
              <h4>${item.name || item.nameRu || item.nameBg}</h4>
              <p>${item.description || item.descriptionRu || item.descriptionBg || ""}</p>
              <strong>${money(item.price)}</strong>
              <button class="seatmap-pro-ghost" type="button" data-menu-id="${item.id}">Добавить</button>
            </div>
          </article>
        `
      )
      .join("");

    grid.querySelectorAll("[data-menu-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = menu.find((entry) => String(entry.id) === String(button.dataset.menuId));
        if (!item) return;
        const current = selected.get(item.id) || { ...item, qty: 0 };
        current.qty += 1;
        selected.set(item.id, current);
        button.textContent = `Добавлено ×${current.qty}`;
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
        items,
        total: items.reduce((acc, item) => acc + item.price * item.qty, 0),
      };
      await fetch("/api/dining-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      modal.classList.remove("is-open");
      openDashboard();
    };

    renderTotal();
    modal.classList.add("is-open");
  }

  function ticket(order, filter) {
    const items = (order.items || []).filter((item) => !filter || filter(item));
    if (!items.length) return "";
    return `
      <article class="seatmap-pro-ticket">
        <strong>${order.tableId || "T5"} · ${order.guestName || "Guest"}</strong>
        <small>${new Date(order.createdAtUtc || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · ${money(order.total)}</small>
        <div class="seatmap-pro-items">
          ${items.map((item) => `<span>${item.qty || 1}× ${item.name}</span>`).join("")}
        </div>
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

    kitchen.innerHTML = orders.map((order) => ticket(order, (item) => !isDrink(item))).join("") || `<p class="seatmap-pro-muted">Пока нет заказов кухни.</p>`;
    bar.innerHTML = orders.map((order) => ticket(order, isDrink)).join("") || `<p class="seatmap-pro-muted">Пока нет напитков для бара.</p>`;
    map.innerHTML = demoTables
      .map((table) => {
        const tableOrders = orders.filter((order) => String(order.tableId || "T5") === table.id);
        const total = tableOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
        return `
          <div class="seatmap-pro-table ${tableOrders.length ? "has-order" : ""}" style="left:${table.x}%;top:${table.y}%">
            <span>${table.id}</span>
            ${tableOrders.length ? `<small>${money(total)}</small>` : ""}
          </div>
        `;
      })
      .join("");
  }

  function openDashboard() {
    buildShell();
    renderDashboard();
    document.getElementById("seatmapProShell").classList.add("is-open");
  }

  function bindShellEvents() {
    buildShell();
    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-pro-close-email]")) document.getElementById("seatmapProEmail")?.classList.remove("is-open");
      if (event.target.closest("[data-pro-open-menu]")) {
        document.getElementById("seatmapProEmail")?.classList.remove("is-open");
        openMenu();
      }
      if (event.target.closest("[data-pro-close-menu]")) document.getElementById("seatmapProMenu")?.classList.remove("is-open");
      if (event.target.closest("[data-pro-close-shell]")) document.getElementById("seatmapProShell")?.classList.remove("is-open");
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
