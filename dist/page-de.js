"use strict";
(() => {
  // src/page-common.ts
  function formatDate(dateString, locale = "de-AT") {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      // "Montag", "Dienstag", etc.
      day: "numeric",
      // 1, 2, 3, etc.
      month: "long",
      // "Jänner" (AT) or "Januar" (DE)
      year: "numeric"
      // 2025
    });
    return formatter.format(date);
  }
  function switchTab(event, tabName) {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));
    event.target.classList.add("active");
    const tabContent = document.getElementById(`${tabName}-tab`);
    if (tabContent) {
      tabContent.classList.add("active");
    }
  }

  // src/calculators/HolidayCalculator.ts
  function calculateEaster(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = (h + l - 7 * m + 114) % 31 + 1;
    return new Date(year, month - 1, day);
  }
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  function calculateEasterMonday(year) {
    return addDays(calculateEaster(year), 1);
  }
  function calculateAscensionDay(year) {
    return addDays(calculateEaster(year), 39);
  }
  function calculateWhitSunday(year) {
    return addDays(calculateEaster(year), 49);
  }
  function calculateWhitMonday(year) {
    return addDays(calculateEaster(year), 50);
  }
  function calculateCorpusChristi(year) {
    return addDays(calculateEaster(year), 60);
  }
  function calculateGoodFriday(year) {
    return addDays(calculateEaster(year), -2);
  }
  function calculateRepentanceDay(year) {
    const nov23 = new Date(year, 10, 23);
    const dayOfWeek = nov23.getDay();
    const daysBack = dayOfWeek >= 3 ? dayOfWeek - 3 : dayOfWeek + 4;
    return addDays(nov23, -daysBack);
  }
  function calculateDate(year, holidayDef) {
    if (holidayDef.fixed) {
      return new Date(year, holidayDef.fixed.month - 1, holidayDef.fixed.day);
    }
    if (holidayDef.calculator) {
      return holidayDef.calculator(year);
    }
    throw new Error(`Cannot calculate date for holiday: ${holidayDef.nameDE}`);
  }

  // src/data/commonHolidays.ts
  var NEW_YEARS_DAY = {
    nameDE: "Neujahr",
    nameEN: "New Year's Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Neujahr",
    wikipediaEN: "https://en.wikipedia.org/wiki/New_Year%27s_Day",
    fixed: { month: 1, day: 1 }
  };
  var EPIPHANY = {
    nameDE: "Heilige Drei K\xF6nige",
    nameEN: "Epiphany",
    wikipediaDE: "https://de.wikipedia.org/wiki/Erscheinung_des_Herrn",
    wikipediaEN: "https://en.wikipedia.org/wiki/Epiphany_(holiday)",
    fixed: { month: 1, day: 6 }
  };
  var GOOD_FRIDAY = {
    nameDE: "Karfreitag",
    nameEN: "Good Friday",
    wikipediaDE: "https://de.wikipedia.org/wiki/Karfreitag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Good_Friday",
    calculator: calculateGoodFriday
  };
  var EASTER_MONDAY = {
    nameDE: "Ostermontag",
    nameEN: "Easter Monday",
    wikipediaDE: "https://de.wikipedia.org/wiki/Ostermontag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Easter_Monday",
    calculator: calculateEasterMonday
  };
  var LABOUR_DAY = {
    nameDE: "Tag der Arbeit",
    nameEN: "Labour Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Tag_der_Arbeit",
    wikipediaEN: "https://en.wikipedia.org/wiki/International_Workers%27_Day",
    fixed: { month: 5, day: 1 }
  };
  var ASCENSION_DAY = {
    nameDE: "Christi Himmelfahrt",
    nameEN: "Ascension Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Christi_Himmelfahrt",
    wikipediaEN: "https://en.wikipedia.org/wiki/Feast_of_the_Ascension",
    calculator: calculateAscensionDay
  };
  var WHIT_MONDAY = {
    nameDE: "Pfingstmontag",
    nameEN: "Whit Monday",
    wikipediaDE: "https://de.wikipedia.org/wiki/Pfingstmontag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Whit_Monday",
    calculator: calculateWhitMonday
  };
  var CORPUS_CHRISTI = {
    nameDE: "Fronleichnam",
    nameEN: "Corpus Christi",
    wikipediaDE: "https://de.wikipedia.org/wiki/Fronleichnam",
    wikipediaEN: "https://en.wikipedia.org/wiki/Corpus_Christi_(feast)",
    calculator: calculateCorpusChristi
  };
  var ASSUMPTION_OF_MARY = {
    nameDE: "Mari\xE4 Himmelfahrt",
    nameEN: "Assumption of Mary",
    wikipediaDE: "https://de.wikipedia.org/wiki/Mari%C3%A4_Aufnahme_in_den_Himmel",
    wikipediaEN: "https://en.wikipedia.org/wiki/Assumption_of_Mary",
    fixed: { month: 8, day: 15 }
  };
  var ALL_SAINTS_DAY = {
    nameDE: "Allerheiligen",
    nameEN: "All Saints' Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Allerheiligen",
    wikipediaEN: "https://en.wikipedia.org/wiki/All_Saints%27_Day",
    fixed: { month: 11, day: 1 }
  };
  var CHRISTMAS_DAY = {
    nameDE: "Erster Weihnachtstag",
    nameEN: "Christmas Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Weihnachten",
    wikipediaEN: "https://en.wikipedia.org/wiki/Christmas",
    fixed: { month: 12, day: 25 }
  };
  var BOXING_DAY = {
    nameDE: "Zweiter Weihnachtstag",
    nameEN: "Boxing Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Zweiter_Weihnachtsfeiertag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Boxing_Day",
    fixed: { month: 12, day: 26 }
  };

  // src/data/germanHolidays.ts
  var GERMAN_UNITY_DAY = {
    nameDE: "Tag der Deutschen Einheit",
    nameEN: "German Unity Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Tag_der_Deutschen_Einheit",
    wikipediaEN: "https://en.wikipedia.org/wiki/German_Unity_Day",
    scope: "bundesweit",
    // Nationwide holiday
    fixed: { month: 10, day: 3 }
  };
  var REFORMATION_DAY = {
    nameDE: "Reformationstag",
    nameEN: "Reformation Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Reformationstag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Reformation_Day",
    fixed: { month: 10, day: 31 }
  };
  var REPENTANCE_DAY = {
    nameDE: "Bu\xDF- und Bettag",
    nameEN: "Day of Repentance and Prayer",
    wikipediaDE: "https://de.wikipedia.org/wiki/Bu%C3%9F-_und_Bettag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Repentance_and_Prayer_Day",
    calculator: calculateRepentanceDay
  };
  var WOMENS_DAY = {
    nameDE: "Internationaler Frauentag",
    nameEN: "International Women's Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Internationaler_Frauentag",
    wikipediaEN: "https://en.wikipedia.org/wiki/International_Women%27s_Day",
    fixed: { month: 3, day: 8 }
  };
  var WHIT_SUNDAY = {
    nameDE: "Pfingstsonntag",
    nameEN: "Whit Sunday",
    wikipediaDE: "https://de.wikipedia.org/wiki/Pfingsten",
    wikipediaEN: "https://en.wikipedia.org/wiki/Pentecost",
    calculator: calculateWhitSunday
  };
  var EASTER_SUNDAY = {
    nameDE: "Ostersonntag",
    nameEN: "Easter Sunday",
    wikipediaDE: "https://de.wikipedia.org/wiki/Ostern",
    wikipediaEN: "https://en.wikipedia.org/wiki/Easter",
    calculator: calculateEaster
  };
  var AUGSBURG_PEACE_FESTIVAL = {
    nameDE: "Augsburger Friedensfest",
    nameEN: "Augsburg Peace Festival",
    wikipediaDE: "https://de.wikipedia.org/wiki/Augsburger_Hohes_Friedensfest",
    wikipediaEN: "https://en.wikipedia.org/wiki/Augsburger_Hohes_Friedensfest",
    fixed: { month: 8, day: 8 }
  };
  var WORLD_CHILDRENS_DAY = {
    nameDE: "Weltkindertag",
    nameEN: "World Children's Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Weltkindertag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Children%27s_Day",
    fixed: { month: 9, day: 20 }
  };
  var commonGermanHolidays = [
    NEW_YEARS_DAY,
    GOOD_FRIDAY,
    EASTER_MONDAY,
    LABOUR_DAY,
    ASCENSION_DAY,
    WHIT_MONDAY,
    GERMAN_UNITY_DAY,
    CHRISTMAS_DAY,
    BOXING_DAY
  ].map((holiday) => ({ ...holiday, scope: "bundesweit" }));
  var stateSpecificHolidays = {
    "Baden-W\xFCrttemberg": [
      EPIPHANY,
      CORPUS_CHRISTI,
      ALL_SAINTS_DAY
    ],
    "Bayern": [
      EPIPHANY,
      CORPUS_CHRISTI,
      ALL_SAINTS_DAY
    ],
    "Bayern (katholisch)": [
      EPIPHANY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY
    ],
    "Augsburg": [
      EPIPHANY,
      CORPUS_CHRISTI,
      AUGSBURG_PEACE_FESTIVAL,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY
    ],
    "Berlin": [
      WOMENS_DAY
    ],
    "Brandenburg": [
      EASTER_SUNDAY,
      WHIT_SUNDAY,
      REFORMATION_DAY
    ],
    "Bremen": [
      REFORMATION_DAY
    ],
    "Hamburg": [
      REFORMATION_DAY
    ],
    "Hessen": [
      CORPUS_CHRISTI
    ],
    "Mecklenburg-Vorpommern": [
      WOMENS_DAY,
      REFORMATION_DAY
    ],
    "Niedersachsen": [
      REFORMATION_DAY
    ],
    "Nordrhein-Westfalen": [
      CORPUS_CHRISTI,
      ALL_SAINTS_DAY
    ],
    "Rheinland-Pfalz": [
      CORPUS_CHRISTI,
      ALL_SAINTS_DAY
    ],
    "Saarland": [
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY
    ],
    "Sachsen": [
      REFORMATION_DAY,
      REPENTANCE_DAY
    ],
    "Sachsen (katholisch)": [
      CORPUS_CHRISTI,
      REFORMATION_DAY,
      REPENTANCE_DAY
    ],
    "Sachsen-Anhalt": [
      EPIPHANY,
      REFORMATION_DAY
    ],
    "Schleswig-Holstein": [
      REFORMATION_DAY
    ],
    "Th\xFCringen": [
      WORLD_CHILDRENS_DAY,
      REFORMATION_DAY
    ],
    "Th\xFCringen (katholisch)": [
      CORPUS_CHRISTI,
      WORLD_CHILDRENS_DAY,
      REFORMATION_DAY
    ]
  };
  function getGermanHolidaysForVariant(state) {
    const specificHolidays = stateSpecificHolidays[state] || [];
    return [...commonGermanHolidays, ...specificHolidays];
  }
  var germanCalenderVariants = [
    "Baden-W\xFCrttemberg",
    "Bayern",
    "Bayern (katholisch)",
    "Augsburg",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hessen",
    "Mecklenburg-Vorpommern",
    "Niedersachsen",
    "Nordrhein-Westfalen",
    "Rheinland-Pfalz",
    "Saarland",
    "Sachsen",
    "Sachsen (katholisch)",
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Th\xFCringen",
    "Th\xFCringen (katholisch)"
  ];

  // src/types/Holiday.ts
  function stateToFilename(state) {
    return state.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, "-").replace(/[()]/g, "");
  }

  // src/page-de.ts
  function renderHolidays(year, bundesland) {
    const holidays = getGermanHolidaysForVariant(bundesland).map((holidayDef) => {
      return {
        ...holidayDef,
        date: calculateDate(year, holidayDef)
      };
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
    const container = document.getElementById("holidays");
    const holidayYearSpan = document.getElementById("holiday-year");
    const holidayBundeslandSpan = document.getElementById("holiday-bundesland");
    if (!container || !holidayYearSpan || !holidayBundeslandSpan) return;
    holidayYearSpan.textContent = year.toString();
    holidayBundeslandSpan.textContent = bundesland;
    container.innerHTML = holidays.map((h) => {
      const scope = h.scope || "regional";
      const wikiLink = h.wikipediaDE ? `<a href="${h.wikipediaDE}" target="_blank" rel="noopener" class="info-link" title="Mehr erfahren (Wikipedia)">\u2139\uFE0F</a>` : "";
      return `
            <div class="holiday-card">
                <h3>
                    ${h.nameDE}
                    ${wikiLink}
                </h3>
                <div class="date">${formatDate(h.date.toISOString(), "de-DE")}</div>
                <div class="subtitle">${h.nameEN}</div>
                <div class="scope-badge ${scope === "bundesweit" ? "bundesweit" : ""}">${scope}</div>
            </div>
        `;
    }).join("");
  }
  function updateCalendar() {
    const yearSelect = document.getElementById("yearSelect");
    const bundeslandSelect = document.getElementById("bundeslandSelect");
    if (!yearSelect || !bundeslandSelect) return;
    const year = parseInt(yearSelect.value);
    const bundesland = bundeslandSelect.value;
    renderHolidays(year, bundesland);
  }
  function renderDownloadLinks() {
    const germanHolidaysContainer = document.getElementById("german-holidays-downloads");
    if (germanHolidaysContainer) {
      germanHolidaysContainer.innerHTML = germanCalenderVariants.map(
        (variant) => `<a href="../output/german_holidays_${stateToFilename(variant)}.ics" class="download-btn">${variant}</a>`
      ).join("");
    }
  }
  async function init() {
    const yearSelect = document.getElementById("yearSelect");
    const bundeslandSelect = document.getElementById("bundeslandSelect");
    if (!yearSelect || !bundeslandSelect) return;
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const startYear = currentYear - 1;
    const endYear = currentYear + 5;
    for (let year = startYear; year <= endYear; year++) {
      const option = document.createElement("option");
      option.value = year.toString();
      option.textContent = year.toString();
      if (year === currentYear) option.selected = true;
      yearSelect.appendChild(option);
    }
    bundeslandSelect.innerHTML = "";
    for (const variant of germanCalenderVariants) {
      const option = document.createElement("option");
      option.value = variant;
      option.textContent = variant;
      bundeslandSelect.appendChild(option);
    }
    renderDownloadLinks();
    updateCalendar();
  }
  window.switchTab = switchTab;
  window.updateCalendar = updateCalendar;
  document.addEventListener("DOMContentLoaded", init);
})();
