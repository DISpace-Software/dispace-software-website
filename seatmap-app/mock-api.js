(function () {
  const originalFetch = window.fetch.bind(window);
  const apiHostPattern = /https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\]):5183\/api/i;

  const state = {
    nextReservationId: 18,
    reservations: [
      {
        id: 17,
        name: "Ivan",
        email: "home2u.s.sert@gmail.com",
        phone: "0892062096",
        date: "2026-05-22",
        time: "15:00",
        guests: 2,
        tableId: 49,
        tableIds: [49],
        areaId: "hall",
        areaName: "Hall / Non-smoking",
        status: "Pending",
        notes: "",
        internalNote: "",
        isRegular: true,
        isBlacklisted: true,
        marketingConsent: true,
        privacyConsent: true,
        createdByAdmin: false,
        createdAtUtc: new Date().toISOString(),
      },
    ],
    orders: [],
    blacklist: [
      {
        id: 1,
        name: "Ivan",
        phone: "0892062096",
        email: "home2u.s.sert@gmail.com",
        reason: "Demo blacklist record",
        createdAtUtc: new Date().toISOString(),
      },
    ],
    admins: [
      {
        id: 1,
        name: "Demo Admin",
        email: "admin@seatmap.local",
        role: "Owner",
        isActive: true,
      },
    ],
    audit: [
      {
        id: 1,
        action: "Demo started",
        entity: "SeatMap",
        entityId: "beta",
        adminName: "System",
        createdAtUtc: new Date().toISOString(),
      },
    ],
  };

  const menu = [
    {
      id: 1,
      name: "Truffle Burrata",
      nameBg: "Трюфел бурата",
      nameRu: "Буррата с трюфелем",
      description: "Burrata, cherry tomatoes, basil oil, truffle.",
      descriptionBg: "Бурата, чери домати, босилково олио, трюфел.",
      descriptionRu: "Буррата, томаты черри, масло базилика, трюфель.",
      category: "Starters",
      price: 28,
      imageUrl: "./seatmap-terrace-restaurant.png",
      isAvailable: true,
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 2,
      name: "Wagyu Slider",
      nameBg: "Wagyu слайдер",
      nameRu: "Wagyu слайдер",
      description: "Mini brioche, wagyu beef, cheddar, signature sauce.",
      descriptionBg: "Мини бриош, wagyu телешко, чедър, signature сос.",
      descriptionRu: "Мини-бриош, говядина wagyu, чеддер, фирменный соус.",
      category: "Mains",
      price: 34,
      imageUrl: "./seatmap-hero-restaurant.png",
      isAvailable: true,
      isActive: true,
      sortOrder: 2,
    },
    {
      id: 3,
      name: "Golden Tiramisu",
      nameBg: "Златно тирамису",
      nameRu: "Золотой тирамису",
      description: "Classic tiramisu with gold dust and espresso cream.",
      descriptionBg: "Класическо тирамису със златен прах и еспресо крем.",
      descriptionRu: "Классический тирамису с золотой пудрой и эспрессо-кремом.",
      category: "Desserts",
      price: 18,
      imageUrl: "./seatmap-open-terrace.png",
      isAvailable: true,
      isActive: true,
      sortOrder: 3,
    },
  ];

  function json(data, init = {}) {
    return Promise.resolve(
      new Response(JSON.stringify(data), {
        status: init.status || 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  async function readBody(options) {
    if (!options || !options.body) return {};
    try {
      return JSON.parse(options.body);
    } catch {
      return {};
    }
  }

  function getPath(input) {
    const raw = typeof input === "string" ? input : input && input.url;
    if (!raw || !apiHostPattern.test(raw)) return null;
    return new URL(raw).pathname;
  }

  window.fetch = async function mockSeatMapFetch(input, options = {}) {
    const path = getPath(input);
    if (!path) return originalFetch(input, options);

    const method = (options.method || "GET").toUpperCase();

    if (path === "/api/menu") {
      if (method === "GET") return json(menu);
      if (method === "POST") return json({ id: menu.length + 1, ...(await readBody(options)) });
    }

    if (path.startsWith("/api/menu/")) {
      return json({ ok: true });
    }

    if (path === "/api/reservations/blocked-slots") return json([]);
    if (path === "/api/table-layouts") return json([]);
    if (path === "/api/table-layouts/reset") return json([]);

    if (path === "/api/reservations") {
      if (method === "GET") return json(state.reservations);
      if (method === "POST") {
        const body = await readBody(options);
        const reservation = {
          id: state.nextReservationId++,
          status: "Pending",
          createdAtUtc: new Date().toISOString(),
          tableIds: body.tableIds || (body.tableId ? [body.tableId] : []),
          ...body,
        };
        state.reservations.unshift(reservation);
        return json(reservation, { status: 201 });
      }
    }

    if (/^\/api\/reservations\/\d+\/(approve|cancel|arrive|no-show|release|note|tables)$/.test(path)) {
      return json({ ok: true });
    }

    if (path === "/api/reservations/block") return json({ ok: true });

    if (path === "/api/dining-orders") return json(state.orders);
    if (path.startsWith("/api/dining-orders")) return json({ ok: true });

    if (path === "/api/blacklist") {
      if (method === "GET") return json(state.blacklist);
      if (method === "POST") return json({ id: state.blacklist.length + 1, ...(await readBody(options)) });
    }
    if (path.startsWith("/api/blacklist/")) return json({ ok: true });

    if (path === "/api/admin/login" || path === "/api/admin/device-login") {
      return json({
        token: "seatmap-demo-token",
        user: { id: 1, name: "Demo Admin", email: "admin@seatmap.local", role: "Owner" },
      });
    }
    if (path === "/api/admin/users") return json(state.admins);
    if (path === "/api/admin/audit") return json(state.audit);
    if (path === "/api/admin/devices") return json([]);

    return json({ ok: true });
  };
})();
