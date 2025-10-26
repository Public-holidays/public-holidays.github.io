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
  function populateYearSelect(yearSelect) {
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
  }
  function populateBundeslandSelect(bundeslandStrings, bundeslandSelect) {
    bundeslandSelect.innerHTML = "";
    const sortedStrings = [...bundeslandStrings].sort((a, b) => a.localeCompare(b, "de"));
    for (const variant of sortedStrings) {
      const option = document.createElement("option");
      option.value = variant;
      option.textContent = variant;
      bundeslandSelect.appendChild(option);
    }
  }
  var REGION_SELECT_ID = "bundeslandSelect";
  var YEAR_SELECT_ID = "yearSelect";
  function initPage(config) {
    const yearSelect = document.getElementById(YEAR_SELECT_ID);
    const regionSelect = document.getElementById(config.regionSelectId);
    if (!yearSelect || !regionSelect) {
      console.error("Required select elements not found");
      return;
    }
    populateYearSelect(yearSelect);
    populateBundeslandSelect(config.regions, regionSelect);
    config.renderDownloadLinks();
    const updateCalendar = () => {
      const year = parseInt(yearSelect.value);
      const region = regionSelect.value;
      config.renderHolidays(year, region);
      if (config.renderSchoolHolidays) {
        config.renderSchoolHolidays(year, region);
      }
    };
    window.switchTab = switchTab;
    window.updateCalendar = updateCalendar;
    updateCalendar();
  }
  function renderHolidayCard(holiday, formatDate2, locale = "de-DE") {
    const scope = holiday.scope || "regional";
    const wikiLink = holiday.wikipediaDE ? `<a href="${holiday.wikipediaDE}" target="_blank" rel="noopener" class="info-link" title="Mehr erfahren (Wikipedia)">\u2139\uFE0F</a>` : "";
    const isSingleDay = !holiday.endDate || holiday.date.getTime() === holiday.endDate.getTime();
    const dateDisplay = formatDate2(holiday.date.toISOString(), locale);
    const endDateDisplay = !isSingleDay && holiday.endDate ? `<div class="subtitle">bis ${formatDate2(holiday.endDate.toISOString(), locale)}</div>` : "";
    return `
        <div class="holiday-card">
            <h3>
                ${holiday.nameDE}
                ${wikiLink}
            </h3>
            <div class="date">${dateDisplay}</div>
            ${endDateDisplay}
            <div class="subtitle">${holiday.nameEN}</div>
            ${holiday.scope ? `<div class="scope-badge ${scope === "bundesweit" || scope === "national" ? scope : ""}">${scope}</div>` : ""}
       </div>
    `;
  }
  function renderDownloadLinksGeneric(config) {
    const container = document.getElementById(config.containerId);
    if (!container) return;
    const basePath = config.basePath || "../output/";
    container.innerHTML = config.files.map(
      (link) => `<a href="${basePath}${link.file}" class="download-btn">${link.label}</a>`
    ).join("");
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
  function calculateWhitMonday(year) {
    return addDays(calculateEaster(year), 50);
  }
  function calculateCorpusChristi(year) {
    return addDays(calculateEaster(year), 60);
  }
  function calculateGoodFriday(year) {
    return addDays(calculateEaster(year), -2);
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

  // src/data/swissHolidays.ts
  var SWISS_NATIONAL_DAY = {
    nameDE: "Bundesfeiertag",
    nameEN: "Swiss National Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Bundesfeiertag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Swiss_National_Day",
    fixed: { month: 8, day: 1 },
    scope: "national"
  };
  var BERCHTOLDSTAG = {
    nameDE: "Berchtoldstag",
    nameEN: "Berchtold's Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Berchtoldstag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Berchtold%27s_Day",
    fixed: { month: 1, day: 2 }
  };
  var EPIPHANY = {
    nameDE: "Heilige Drei K\xF6nige",
    nameEN: "Epiphany",
    wikipediaDE: "https://de.wikipedia.org/wiki/Erscheinung_des_Herrn",
    wikipediaEN: "https://en.wikipedia.org/wiki/Epiphany_(holiday)",
    fixed: { month: 1, day: 6 }
  };
  var JOSEPHS_DAY = {
    nameDE: "Josefstag",
    nameEN: "Saint Joseph's Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Josefstag",
    wikipediaEN: "https://en.wikipedia.org/wiki/Saint_Joseph%27s_Day",
    fixed: { month: 3, day: 19 }
  };
  var IMMACULATE_CONCEPTION = {
    nameDE: "Mari\xE4 Empf\xE4ngnis",
    nameEN: "Immaculate Conception",
    wikipediaDE: "https://de.wikipedia.org/wiki/Mari%C3%A4_Empf%C3%A4ngnis",
    wikipediaEN: "https://en.wikipedia.org/wiki/Immaculate_Conception",
    fixed: { month: 12, day: 8 }
  };
  var PETER_AND_PAUL = {
    nameDE: "Peter und Paul",
    nameEN: "Saints Peter and Paul",
    wikipediaDE: "https://de.wikipedia.org/wiki/Peter_und_Paul",
    wikipediaEN: "https://en.wikipedia.org/wiki/Feast_of_Saints_Peter_and_Paul",
    fixed: { month: 6, day: 29 }
  };
  var nationalHolidays = [
    NEW_YEARS_DAY,
    ASCENSION_DAY,
    SWISS_NATIONAL_DAY,
    CHRISTMAS_DAY
  ].map((holiday) => ({ ...holiday, scope: "national" }));
  var cantonalHolidays = {
    "Z\xFCrich": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      BOXING_DAY
    ],
    "Bern": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      BOXING_DAY
    ],
    "Luzern": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      JOSEPHS_DAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Uri": [
      EPIPHANY,
      JOSEPHS_DAY,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Schwyz": [
      EPIPHANY,
      JOSEPHS_DAY,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Obwalden": [
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Nidwalden": [
      JOSEPHS_DAY,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Glarus": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      ALL_SAINTS_DAY,
      BOXING_DAY
    ],
    "Zug": [
      BERCHTOLDSTAG,
      JOSEPHS_DAY,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Freiburg": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Solothurn": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Basel-Stadt": [
      GOOD_FRIDAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      BOXING_DAY
    ],
    "Basel-Landschaft": [
      GOOD_FRIDAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      BOXING_DAY
    ],
    "Schaffhausen": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      BOXING_DAY
    ],
    "Appenzell Ausserrhoden": [
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      BOXING_DAY
    ],
    "Appenzell Innerrhoden": [
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "St. Gallen": [
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Graub\xFCnden": [
      EPIPHANY,
      JOSEPHS_DAY,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Aargau": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Thurgau": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      BOXING_DAY
    ],
    "Tessin": [
      EPIPHANY,
      JOSEPHS_DAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      PETER_AND_PAUL,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Waadt": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      BOXING_DAY
    ],
    "Wallis": [
      JOSEPHS_DAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      IMMACULATE_CONCEPTION,
      BOXING_DAY
    ],
    "Neuenburg": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      BOXING_DAY
    ],
    "Genf": [
      GOOD_FRIDAY,
      EASTER_MONDAY,
      WHIT_MONDAY,
      BOXING_DAY
    ],
    "Jura": [
      BERCHTOLDSTAG,
      GOOD_FRIDAY,
      EASTER_MONDAY,
      LABOUR_DAY,
      WHIT_MONDAY,
      CORPUS_CHRISTI,
      ASSUMPTION_OF_MARY,
      ALL_SAINTS_DAY,
      BOXING_DAY
    ]
  };
  function getSwissHolidaysForCanton(canton) {
    const cantonal = cantonalHolidays[canton] || [];
    return [...nationalHolidays, ...cantonal];
  }
  var swissCantons = [
    "Z\xFCrich",
    "Bern",
    "Luzern",
    "Uri",
    "Schwyz",
    "Obwalden",
    "Nidwalden",
    "Glarus",
    "Zug",
    "Freiburg",
    "Solothurn",
    "Basel-Stadt",
    "Basel-Landschaft",
    "Schaffhausen",
    "Appenzell Ausserrhoden",
    "Appenzell Innerrhoden",
    "St. Gallen",
    "Graub\xFCnden",
    "Aargau",
    "Thurgau",
    "Tessin",
    "Waadt",
    "Wallis",
    "Neuenburg",
    "Genf",
    "Jura"
  ];

  // src/types/Holiday.ts
  function stateToFilename(state) {
    return state.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, "-").replace(/[()]/g, "");
  }

  // src/page-ch.ts
  function renderHolidays(year, canton) {
    const holidays = getSwissHolidaysForCanton(canton).map((holidayDef) => {
      return {
        ...holidayDef,
        date: calculateDate(year, holidayDef)
      };
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
    const container = document.getElementById("holidays");
    const holidayYearSpan = document.getElementById("holiday-year");
    const holidayCantonSpan = document.getElementById("holiday-canton");
    if (!container || !holidayYearSpan || !holidayCantonSpan) return;
    holidayYearSpan.textContent = year.toString();
    holidayCantonSpan.textContent = canton;
    container.innerHTML = holidays.map(
      (h) => renderHolidayCard(h, formatDate, "de-CH")
    ).join("");
  }
  function renderDownloadLinks() {
    renderDownloadLinksGeneric({
      containerId: "swiss-holidays-downloads",
      files: swissCantons.map((canton) => ({
        file: `swiss_holidays_${stateToFilename(canton)}.ics`,
        label: canton
      }))
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    initPage({
      regionSelectId: REGION_SELECT_ID,
      regions: swissCantons,
      renderHolidays,
      renderDownloadLinks
    });
  });
})();
