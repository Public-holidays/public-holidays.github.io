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
  function getDaysBetween(start, end) {
    const diffTime = Math.abs(new Date(end).getTime() - new Date(start).getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    return diffDays + 1;
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
    for (const variant of bundeslandStrings) {
      const option = document.createElement("option");
      option.value = variant;
      option.textContent = variant;
      bundeslandSelect.appendChild(option);
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
  function calculateWhitMonday(year) {
    return addDays(calculateEaster(year), 50);
  }
  function calculateCorpusChristi(year) {
    return addDays(calculateEaster(year), 60);
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

  // src/data/austrianHolidays.ts
  var NATIONAL_DAY = {
    nameDE: "Nationalfeiertag",
    nameEN: "National Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Nationalfeiertag_(%C3%96sterreich)",
    wikipediaEN: "https://en.wikipedia.org/wiki/National_Day_(Austria)",
    fixed: { month: 10, day: 26 }
  };
  var IMMACULATE_CONCEPTION = {
    nameDE: "Mari\xE4 Empf\xE4ngnis",
    nameEN: "Immaculate Conception",
    wikipediaDE: "https://de.wikipedia.org/wiki/Mari\xE4_Empf\xE4ngnis",
    wikipediaEN: "https://en.wikipedia.org/wiki/Feast_of_the_Immaculate_Conception",
    fixed: { month: 12, day: 8 }
  };
  var CHRISTMAS_DAY_AT = {
    nameDE: "Christtag",
    nameEN: "Christmas Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Weihnachten",
    wikipediaEN: "https://en.wikipedia.org/wiki/Christmas",
    fixed: { month: 12, day: 25 }
  };
  var ST_STEPHENS_DAY = {
    nameDE: "Stefanitag",
    nameEN: "St. Stephen's Day",
    wikipediaDE: "https://de.wikipedia.org/wiki/Stephanstag",
    wikipediaEN: "https://en.wikipedia.org/wiki/St._Stephen%27s_Day",
    fixed: { month: 12, day: 26 }
  };
  var austrianHolidays = [
    NEW_YEARS_DAY,
    EPIPHANY,
    EASTER_MONDAY,
    LABOUR_DAY,
    ASCENSION_DAY,
    WHIT_MONDAY,
    CORPUS_CHRISTI,
    ASSUMPTION_OF_MARY,
    NATIONAL_DAY,
    ALL_SAINTS_DAY,
    IMMACULATE_CONCEPTION,
    CHRISTMAS_DAY_AT,
    ST_STEPHENS_DAY
  ];
  var austrianRegions = [
    "Wien",
    "Nieder\xF6sterreich",
    "Burgenland",
    "Ober\xF6sterreich",
    "Steiermark",
    "K\xE4rnten",
    "Salzburg",
    "Tirol",
    "Vorarlberg"
  ];

  // src/calculators/SchoolHolidayCalculator.ts
  function getFirstMondayOfMonth(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    const dayOfWeek = firstDay.getDay();
    if (dayOfWeek === 1) {
      return firstDay;
    }
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek + 1;
    return addDays(firstDay, daysUntilMonday);
  }
  function getNthMondayOfMonth(year, month, n) {
    const firstMonday = getFirstMondayOfMonth(year, month);
    return addDays(firstMonday, (n - 1) * 7);
  }
  function getFirstSaturdayInRange(year, month, startDay) {
    const startDate = new Date(year, month - 1, startDay);
    const dayOfWeek = startDate.getDay();
    if (dayOfWeek === 6) {
      return startDate;
    }
    const daysUntilSaturday = dayOfWeek === 0 ? 6 : 6 - dayOfWeek;
    return addDays(startDate, daysUntilSaturday);
  }
  function calculateSchoolYearStart(year, region) {
    const group1 = ["Burgenland", "Nieder\xF6sterreich", "Wien"];
    if (group1.includes(region)) {
      return getNthMondayOfMonth(year, 9, 1);
    } else {
      return getNthMondayOfMonth(year, 9, 2);
    }
  }
  function calculateChristmasBreak(year) {
    return {
      startDate: new Date(year, 11, 24),
      // December 24
      endDate: new Date(year + 1, 0, 6),
      // January 6 next year
      nameDE: "Weihnachtsferien",
      nameEN: "Christmas Break"
    };
  }
  function calculateSemesterBreak(year, region) {
    const group1 = ["Nieder\xF6sterreich", "Wien"];
    const group2 = ["Burgenland", "K\xE4rnten", "Salzburg", "Tirol", "Vorarlberg"];
    const group3 = ["Ober\xF6sterreich", "Steiermark"];
    let startDate;
    if (group1.includes(region)) {
      startDate = getNthMondayOfMonth(year, 2, 1);
    } else if (group2.includes(region)) {
      startDate = getNthMondayOfMonth(year, 2, 2);
    } else if (group3.includes(region)) {
      startDate = getNthMondayOfMonth(year, 2, 3);
    } else {
      throw new Error(`Unknown region: ${region}`);
    }
    const endDate = addDays(startDate, 5);
    return {
      startDate,
      endDate,
      nameDE: "Semesterferien",
      nameEN: "Semester Break"
    };
  }
  function calculateEasterBreak(year) {
    const easter = calculateEaster(year);
    const palmSunday = addDays(easter, -7);
    const saturdayBefore = addDays(palmSunday, -1);
    const easterMonday = addDays(easter, 1);
    return {
      startDate: saturdayBefore,
      endDate: easterMonday,
      nameDE: "Osterferien",
      nameEN: "Easter Break"
    };
  }
  function calculateWhitBreak(year) {
    const easter = calculateEaster(year);
    const whitSunday = addDays(easter, 49);
    const saturdayBefore = addDays(whitSunday, -1);
    const whitMonday = addDays(whitSunday, 1);
    return {
      startDate: saturdayBefore,
      endDate: whitMonday,
      nameDE: "Pfingstferien",
      nameEN: "Whit Break"
    };
  }
  function calculateAutumnBreak(year) {
    return {
      startDate: new Date(year, 9, 27),
      // October 27
      endDate: new Date(year, 9, 31),
      // October 31
      nameDE: "Herbstferien",
      nameEN: "Autumn Break"
    };
  }
  function calculateSummerHolidays(year, region) {
    const group1 = ["Burgenland", "Nieder\xF6sterreich", "Wien"];
    let startDate;
    if (group1.includes(region)) {
      startDate = getFirstSaturdayInRange(year, 6, 28);
    } else {
      startDate = getFirstSaturdayInRange(year, 7, 5);
    }
    const schoolYearStart = calculateSchoolYearStart(year, region);
    const endDate = addDays(schoolYearStart, -1);
    return {
      startDate,
      endDate,
      nameDE: "Sommerferien",
      nameEN: "Summer Holidays"
    };
  }
  function getPatronSaintDay(year, region) {
    const patronDays = {
      K\u00E4rnten: {
        date: new Date(year, 2, 19),
        // March 19
        nameDE: "Hl. Josef",
        nameEN: "St. Joseph"
      },
      Steiermark: {
        date: new Date(year, 2, 19),
        // March 19
        nameDE: "Hl. Josef",
        nameEN: "St. Joseph"
      },
      Tirol: {
        date: new Date(year, 2, 19),
        // March 19
        nameDE: "Hl. Josef",
        nameEN: "St. Joseph"
      },
      Vorarlberg: {
        date: new Date(year, 2, 19),
        // March 19
        nameDE: "Hl. Josef",
        nameEN: "St. Joseph"
      },
      Ober\u00F6sterreich: {
        date: new Date(year, 4, 4),
        // May 4
        nameDE: "Hl. Florian",
        nameEN: "St. Florian"
      },
      Salzburg: {
        date: new Date(year, 8, 24),
        // September 24
        nameDE: "Hl. Rupert",
        nameEN: "St. Rupert"
      },
      Burgenland: {
        date: new Date(year, 10, 11),
        // November 11
        nameDE: "Hl. Martin",
        nameEN: "St. Martin"
      },
      Wien: {
        date: new Date(year, 10, 15),
        // November 15
        nameDE: "Hl. Leopold",
        nameEN: "St. Leopold"
      },
      Nieder\u00F6sterreich: {
        date: new Date(year, 10, 15),
        // November 15
        nameDE: "Hl. Leopold",
        nameEN: "St. Leopold"
      }
    };
    return patronDays[region];
  }
  function getStateHoliday(year, region) {
    if (region === "K\xE4rnten") {
      return {
        date: new Date(year, 9, 10),
        // October 10
        nameDE: "Tag der Volksabstimmung",
        nameEN: "Carinthian Plebiscite Day"
      };
    }
    return null;
  }
  function getSchoolHolidays(year, region) {
    const holidays = [];
    const patronDay = getPatronSaintDay(year, region);
    if (patronDay) {
      holidays.push({
        startDate: patronDay.date,
        endDate: patronDay.date,
        nameDE: patronDay.nameDE,
        nameEN: patronDay.nameEN
      });
    }
    const stateHoliday = getStateHoliday(year, region);
    if (stateHoliday) {
      holidays.push({
        startDate: stateHoliday.date,
        endDate: stateHoliday.date,
        nameDE: stateHoliday.nameDE,
        nameEN: stateHoliday.nameEN
      });
    }
    holidays.push(calculateSemesterBreak(year, region));
    holidays.push(calculateEasterBreak(year));
    holidays.push(calculateWhitBreak(year));
    holidays.push(calculateSummerHolidays(year, region));
    holidays.push(calculateAutumnBreak(year));
    holidays.push(calculateChristmasBreak(year));
    return holidays;
  }

  // src/types/Holiday.ts
  function stateToFilename(state) {
    return state.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, "-").replace(/[()]/g, "");
  }

  // src/page-at.ts
  function renderPublicHolidays(year) {
    const holidays = austrianHolidays.map((holidayDef) => {
      return {
        ...holidayDef,
        date: calculateDate(year, holidayDef)
      };
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
    const container = document.getElementById("public-holidays");
    const publicYearSpan = document.getElementById("public-year");
    if (!container || !publicYearSpan) return;
    publicYearSpan.textContent = year.toString();
    container.innerHTML = holidays.map((h) => {
      const wikiLink = h.wikipediaDE ? `<a href="${h.wikipediaDE}" target="_blank" rel="noopener" class="info-link" title="Mehr erfahren (Wikipedia)">\u2139\uFE0F</a>` : "";
      return `
            <div class="holiday-card">
                <h3>
                    ${h.nameDE}
                    ${wikiLink}
                </h3>
                <div class="date">${formatDate(h.date.toISOString())}</div>
                <div class="subtitle">${h.nameEN}</div>
            </div>
        `;
    }).join("");
  }
  function renderSchoolHolidays(year, bundesland) {
    const holidays = getSchoolHolidays(year, bundesland);
    const container = document.getElementById("school-holidays");
    const schoolYearSpan = document.getElementById("school-year");
    const schoolBundeslandSpan = document.getElementById("school-bundesland");
    if (!container || !schoolYearSpan || !schoolBundeslandSpan) return;
    schoolYearSpan.textContent = year.toString();
    schoolBundeslandSpan.textContent = bundesland;
    container.innerHTML = holidays.map((h) => {
      const days = getDaysBetween(h.startDate.toISOString(), h.endDate.toISOString());
      const isSingleDay = h.startDate.getTime() === h.endDate.getTime();
      return `
            <div class="holiday-card">
                <h3>${h.nameDE}</h3>
                <div class="date">${formatDate(h.startDate.toISOString())}</div>
                ${!isSingleDay ? `<div class="subtitle">bis ${formatDate(h.endDate.toISOString())}</div>` : ""}
                <div class="subtitle">${h.nameEN}</div>
                <div class="duration">${days} Tag${days > 1 ? "e" : ""}</div>
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
    renderPublicHolidays(year);
    renderSchoolHolidays(year, bundesland);
  }
  function renderDownloadLinks() {
    const publicHolidaysContainer = document.getElementById("public-holidays-downloads");
    if (publicHolidaysContainer) {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const years = [currentYear, currentYear + 1, currentYear + 2];
      const links = [
        { file: "austrian_holidays.ics", label: "\u{1F4C6} Fortlaufender Kalender (2024-2030)" },
        ...years.map((year) => ({ file: `austrian_holidays_${year}.ics`, label: year.toString() }))
      ];
      publicHolidaysContainer.innerHTML = links.map(
        (link) => `<a href="../output/${link.file}" class="download-btn">${link.label}</a>`
      ).join("");
    }
    const schoolHolidaysContainer = document.getElementById("school-holidays-downloads");
    if (schoolHolidaysContainer) {
      schoolHolidaysContainer.innerHTML = austrianRegions.map(
        (region) => `<a href="../output/school/school_holidays_${stateToFilename(region)}.ics" class="download-btn">${region}</a>`
      ).join("");
    }
  }
  async function init() {
    const yearSelect = document.getElementById("yearSelect");
    const bundeslandSelect = document.getElementById("bundeslandSelect");
    if (!yearSelect || !bundeslandSelect) return;
    populateYearSelect(yearSelect);
    populateBundeslandSelect(austrianRegions, bundeslandSelect);
    renderDownloadLinks();
    updateCalendar();
  }
  window.switchTab = switchTab;
  window.updateCalendar = updateCalendar;
  document.addEventListener("DOMContentLoaded", init);
})();
