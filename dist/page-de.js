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
  var germanStates = [
    "Baden-W\xFCrttemberg",
    "Bayern",
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
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Th\xFCringen"
  ];
  var germanStatesSpecialPublicHolidayVariants = [
    "Bayern (katholisch)",
    // Bavaria - Catholic regions with Assumption of Mary
    "Augsburg",
    // Augsburg city - includes Augsburg Peace Festival
    "Sachsen (katholisch)",
    // Saxony - Catholic municipalities with Corpus Christi
    "Th\xFCringen (katholisch)"
    // Thuringia - Catholic municipalities with Corpus Christi
  ];
  var germanCalenderVariants = [
    ...germanStates,
    ...germanStatesSpecialPublicHolidayVariants
  ];
  function parseGermanDate(dateStr) {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(year, month - 1, day);
  }

  // src/types/Holiday.ts
  function stateToFilename(state) {
    return state.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, "-").replace(/[()]/g, "");
  }

  // src/data/germanSchoolHolidays.ts
  var germanSchoolHolidays = {
    "2025/2026": {
      "Baden-W\xFCrttemberg": {
        herbst: { start: "27.10.2025", end: "30.10.2025", extra: "31.10.2025" },
        weihnachten: { start: "22.12.2025", end: "05.01.2026" },
        winter: null,
        ostern: { start: "30.03.2026", end: "11.04.2026" },
        pfingsten: { start: "26.05.2026", end: "05.06.2026" },
        sommer: { start: "30.07.2026", end: "12.09.2026" }
      },
      "Bayern": {
        herbst: { start: "03.11.2025", end: "07.11.2025" },
        weihnachten: { start: "22.12.2025", end: "05.01.2026" },
        winter: { start: "16.02.2026", end: "20.02.2026" },
        ostern: { start: "30.03.2026", end: "10.04.2026" },
        pfingsten: { start: "26.05.2026", end: "05.06.2026" },
        sommer: { start: "03.08.2026", end: "14.09.2026" }
      },
      "Berlin": {
        herbst: { start: "20.10.2025", end: "01.11.2025" },
        weihnachten: { start: "22.12.2025", end: "02.01.2026" },
        winter: { start: "02.02.2026", end: "07.02.2026" },
        ostern: { start: "30.03.2026", end: "10.04.2026" },
        pfingsten: { start: "15.05.2026", end: "15.05.2026", extra: "26.05.2026" },
        sommer: { start: "09.07.2026", end: "22.08.2026" }
      },
      "Brandenburg": {
        herbst: { start: "20.10.2025", end: "01.11.2025" },
        weihnachten: { start: "22.12.2025", end: "02.01.2026" },
        winter: { start: "02.02.2026", end: "07.02.2026" },
        ostern: { start: "30.03.2026", end: "10.04.2026" },
        pfingsten: { start: "26.05.2026", end: "26.05.2026" },
        sommer: { start: "09.07.2026", end: "22.08.2026" }
      },
      "Bremen": {
        herbst: { start: "13.10.2025", end: "25.10.2025" },
        weihnachten: { start: "22.12.2025", end: "05.01.2026" },
        winter: { start: "02.02.2026", end: "03.02.2026" },
        ostern: { start: "23.03.2026", end: "07.04.2026" },
        pfingsten: { start: "15.05.2026", end: "15.05.2026", extra: "26.05.2026" },
        sommer: { start: "02.07.2026", end: "12.08.2026" }
      },
      "Hamburg": {
        herbst: { start: "20.10.2025", end: "31.10.2025" },
        weihnachten: { start: "17.12.2025", end: "02.01.2026" },
        winter: { start: "30.01.2026", end: "30.01.2026" },
        ostern: { start: "02.03.2026", end: "13.03.2026" },
        pfingsten: { start: "11.05.2026", end: "15.05.2026" },
        sommer: { start: "09.07.2026", end: "19.08.2026" }
      },
      "Hessen": {
        herbst: { start: "06.10.2025", end: "18.10.2025" },
        weihnachten: { start: "22.12.2025", end: "10.01.2026" },
        winter: null,
        ostern: { start: "30.03.2026", end: "10.04.2026" },
        pfingsten: null,
        sommer: { start: "29.06.2026", end: "07.08.2026" }
      },
      "Mecklenburg-Vorpommern": {
        herbst: { start: "20.10.2025", end: "24.10.2025", extra: "02.10.2025, 03.11.2025" },
        weihnachten: { start: "20.12.2025", end: "03.01.2026" },
        winter: { start: "09.02.2026", end: "20.02.2026" },
        ostern: { start: "30.03.2026", end: "08.04.2026" },
        pfingsten: { start: "22.05.2026", end: "26.05.2026", extra: "15.05.2026" },
        sommer: { start: "13.07.2026", end: "22.08.2026" }
      },
      "Niedersachsen": {
        herbst: { start: "13.10.2025", end: "25.10.2025" },
        weihnachten: { start: "22.12.2025", end: "05.01.2026" },
        winter: { start: "02.02.2026", end: "03.02.2026" },
        ostern: { start: "23.03.2026", end: "07.04.2026" },
        pfingsten: { start: "15.05.2026", end: "15.05.2026", extra: "26.05.2026" },
        sommer: { start: "02.07.2026", end: "12.08.2026" }
      },
      "Nordrhein-Westfalen": {
        herbst: { start: "13.10.2025", end: "25.10.2025" },
        weihnachten: { start: "22.12.2025", end: "06.01.2026" },
        winter: null,
        ostern: { start: "30.03.2026", end: "11.04.2026" },
        pfingsten: { start: "26.05.2026", end: "26.05.2026" },
        sommer: { start: "20.07.2026", end: "01.09.2026" }
      },
      "Rheinland-Pfalz": {
        herbst: { start: "13.10.2025", end: "24.10.2025" },
        weihnachten: { start: "22.12.2025", end: "07.01.2026" },
        winter: null,
        ostern: { start: "30.03.2026", end: "10.04.2026" },
        pfingsten: null,
        sommer: { start: "29.06.2026", end: "07.08.2026" }
      },
      "Saarland": {
        herbst: { start: "13.10.2025", end: "24.10.2025" },
        weihnachten: { start: "22.12.2025", end: "02.01.2026" },
        winter: { start: "16.02.2026", end: "20.02.2026" },
        ostern: { start: "07.04.2026", end: "17.04.2026" },
        pfingsten: null,
        sommer: { start: "29.06.2026", end: "07.08.2026" }
      },
      "Sachsen": {
        herbst: { start: "06.10.2025", end: "18.10.2025" },
        weihnachten: { start: "22.12.2025", end: "02.01.2026" },
        winter: { start: "09.02.2026", end: "21.02.2026" },
        ostern: { start: "03.04.2026", end: "10.04.2026" },
        pfingsten: { start: "15.05.2026", end: "15.05.2026" },
        sommer: { start: "04.07.2026", end: "14.08.2026" }
      },
      "Sachsen-Anhalt": {
        herbst: { start: "13.10.2025", end: "25.10.2025" },
        weihnachten: { start: "22.12.2025", end: "05.01.2026" },
        winter: { start: "31.01.2026", end: "06.02.2026" },
        ostern: { start: "30.03.2026", end: "04.04.2026" },
        pfingsten: { start: "26.05.2026", end: "29.05.2026" },
        sommer: { start: "04.07.2026", end: "14.08.2026" }
      },
      "Schleswig-Holstein": {
        herbst: { start: "20.10.2025", end: "30.10.2025" },
        weihnachten: { start: "19.12.2025", end: "06.01.2026" },
        winter: null,
        ostern: { start: "26.03.2026", end: "10.04.2026" },
        pfingsten: { start: "15.05.2026", end: "15.05.2026" },
        sommer: { start: "04.07.2026", end: "15.08.2026" }
      },
      "Th\xFCringen": {
        herbst: { start: "06.10.2025", end: "18.10.2025" },
        weihnachten: { start: "22.12.2025", end: "03.01.2026" },
        winter: { start: "16.02.2026", end: "21.02.2026" },
        ostern: { start: "07.04.2026", end: "17.04.2026" },
        pfingsten: { start: "15.05.2026", end: "15.05.2026" },
        sommer: { start: "04.07.2026", end: "14.08.2026" }
      }
    },
    "2026/2027": {
      "Baden-W\xFCrttemberg": {
        herbst: { start: "26.10.2026", end: "30.10.2026", extra: "31.10.2026" },
        weihnachten: { start: "23.12.2026", end: "09.01.2027" },
        winter: null,
        ostern: { start: "25.03.2027", end: "03.04.2027", extra: "30.03.2027" },
        pfingsten: { start: "18.05.2027", end: "29.05.2027" },
        sommer: { start: "29.07.2027", end: "11.09.2027" }
      },
      "Bayern": {
        herbst: { start: "02.11.2026", end: "06.11.2026" },
        weihnachten: { start: "24.12.2026", end: "08.01.2027" },
        winter: { start: "08.02.2027", end: "12.02.2027" },
        ostern: { start: "22.03.2027", end: "02.04.2027" },
        pfingsten: { start: "18.05.2027", end: "28.05.2027" },
        sommer: { start: "02.08.2027", end: "13.09.2027" }
      },
      "Berlin": {
        herbst: { start: "19.10.2026", end: "31.10.2026" },
        weihnachten: { start: "23.12.2026", end: "02.01.2027" },
        winter: { start: "01.02.2027", end: "06.02.2027" },
        ostern: { start: "22.03.2027", end: "02.04.2027" },
        pfingsten: { start: "07.05.2027", end: "07.05.2027", extra: "18.05.2027-19.05.2027" },
        sommer: { start: "01.07.2027", end: "14.08.2027" }
      },
      "Brandenburg": {
        herbst: { start: "19.10.2026", end: "30.10.2026" },
        weihnachten: { start: "23.12.2026", end: "02.01.2027" },
        winter: { start: "01.02.2027", end: "06.02.2027" },
        ostern: { start: "22.03.2027", end: "03.04.2027" },
        pfingsten: { start: "18.05.2027", end: "18.05.2027" },
        sommer: { start: "01.07.2027", end: "14.08.2027" }
      },
      "Bremen": {
        herbst: { start: "12.10.2026", end: "24.10.2026" },
        weihnachten: { start: "23.12.2026", end: "09.01.2027" },
        winter: { start: "01.02.2027", end: "02.02.2027" },
        ostern: { start: "22.03.2027", end: "03.04.2027" },
        pfingsten: { start: "07.05.2027", end: "07.05.2027", extra: "18.05.2027" },
        sommer: { start: "08.07.2027", end: "18.08.2027" }
      },
      "Hamburg": {
        herbst: { start: "19.10.2026", end: "30.10.2026" },
        weihnachten: { start: "21.12.2026", end: "01.01.2027" },
        winter: { start: "29.01.2027", end: "29.01.2027" },
        ostern: { start: "01.03.2027", end: "12.03.2027" },
        pfingsten: { start: "07.05.2027", end: "14.05.2027" },
        sommer: { start: "01.07.2027", end: "11.08.2027" }
      },
      "Hessen": {
        herbst: { start: "05.10.2026", end: "17.10.2026" },
        weihnachten: { start: "23.12.2026", end: "12.01.2027" },
        winter: null,
        ostern: { start: "22.03.2027", end: "02.04.2027" },
        pfingsten: null,
        sommer: { start: "28.06.2027", end: "06.08.2027" }
      },
      "Mecklenburg-Vorpommern": {
        herbst: { start: "15.10.2026", end: "24.10.2026" },
        weihnachten: { start: "21.12.2026", end: "02.01.2027" },
        winter: { start: "08.02.2027", end: "19.02.2027" },
        ostern: { start: "24.03.2027", end: "02.04.2027" },
        pfingsten: { start: "07.05.2027", end: "07.05.2027", extra: "14.05.2027-18.05.2027" },
        sommer: { start: "05.07.2027", end: "14.08.2027" }
      },
      "Niedersachsen": {
        herbst: { start: "12.10.2026", end: "24.10.2026" },
        weihnachten: { start: "23.12.2026", end: "09.01.2027" },
        winter: { start: "01.02.2027", end: "02.02.2027" },
        ostern: { start: "22.03.2027", end: "03.04.2027" },
        pfingsten: { start: "07.05.2027", end: "07.05.2027", extra: "18.05.2027" },
        sommer: { start: "08.07.2027", end: "18.08.2027" }
      },
      "Nordrhein-Westfalen": {
        herbst: { start: "17.10.2026", end: "31.10.2026" },
        weihnachten: { start: "23.12.2026", end: "06.01.2027" },
        winter: null,
        ostern: { start: "22.03.2027", end: "03.04.2027" },
        pfingsten: { start: "18.05.2027", end: "18.05.2027" },
        sommer: { start: "19.07.2027", end: "31.08.2027" }
      },
      "Rheinland-Pfalz": {
        herbst: { start: "05.10.2026", end: "16.10.2026" },
        weihnachten: { start: "23.12.2026", end: "08.01.2027" },
        winter: null,
        ostern: { start: "22.03.2027", end: "02.04.2027" },
        pfingsten: null,
        sommer: { start: "28.06.2027", end: "06.08.2027" }
      },
      "Saarland": {
        herbst: { start: "05.10.2026", end: "16.10.2026" },
        weihnachten: { start: "21.12.2026", end: "31.12.2026" },
        winter: { start: "08.02.2027", end: "12.02.2027" },
        ostern: { start: "30.03.2027", end: "09.04.2027" },
        pfingsten: null,
        sommer: { start: "28.06.2027", end: "06.08.2027" }
      },
      "Sachsen": {
        herbst: { start: "12.10.2026", end: "24.10.2026" },
        weihnachten: { start: "23.12.2026", end: "02.01.2027" },
        winter: { start: "08.02.2027", end: "19.02.2027" },
        ostern: { start: "26.03.2027", end: "02.04.2027" },
        pfingsten: { start: "07.05.2027", end: "07.05.2027", extra: "15.05.2027-18.05.2027" },
        sommer: { start: "10.07.2027", end: "20.08.2027" }
      },
      "Sachsen-Anhalt": {
        herbst: { start: "19.10.2026", end: "30.10.2026" },
        weihnachten: { start: "21.12.2026", end: "02.01.2027" },
        winter: { start: "01.02.2027", end: "06.02.2027" },
        ostern: { start: "22.03.2027", end: "27.03.2027" },
        pfingsten: { start: "15.05.2027", end: "22.05.2027" },
        sommer: { start: "10.07.2027", end: "20.08.2027" }
      },
      "Schleswig-Holstein": {
        herbst: { start: "12.10.2026", end: "24.10.2026" },
        weihnachten: { start: "21.12.2026", end: "06.01.2027" },
        winter: null,
        ostern: { start: "30.03.2027", end: "10.04.2027" },
        pfingsten: { start: "07.05.2027", end: "07.05.2027" },
        sommer: { start: "03.07.2027", end: "14.08.2027" }
      },
      "Th\xFCringen": {
        herbst: { start: "12.10.2026", end: "24.10.2026" },
        weihnachten: { start: "23.12.2026", end: "02.01.2027" },
        winter: { start: "01.02.2027", end: "06.02.2027" },
        ostern: { start: "22.03.2027", end: "03.04.2027" },
        pfingsten: { start: "07.05.2027", end: "07.05.2027" },
        sommer: { start: "10.07.2027", end: "20.08.2027" }
      }
    },
    "2027/2028": {
      "Baden-W\xFCrttemberg": {
        herbst: { start: "02.11.2027", end: "06.11.2027" },
        weihnachten: { start: "23.12.2027", end: "08.01.2028" },
        winter: null,
        ostern: { start: "13.04.2028", end: "13.04.2028", extra: "18.04.2028-22.04.2028" },
        pfingsten: { start: "06.06.2028", end: "17.06.2028" },
        sommer: { start: "27.07.2028", end: "09.09.2028" }
      },
      "Bayern": {
        herbst: { start: "02.11.2027", end: "05.11.2027" },
        weihnachten: { start: "24.12.2027", end: "07.01.2028" },
        winter: { start: "28.02.2028", end: "03.03.2028" },
        ostern: { start: "10.04.2028", end: "21.04.2028" },
        pfingsten: { start: "06.06.2028", end: "16.06.2028" },
        sommer: { start: "31.07.2028", end: "11.09.2028" }
      },
      "Berlin": {
        herbst: { start: "11.10.2027", end: "23.10.2027" },
        weihnachten: { start: "22.12.2027", end: "31.12.2027" },
        winter: { start: "31.01.2028", end: "05.02.2028" },
        ostern: { start: "10.04.2028", end: "22.04.2028" },
        pfingsten: { start: "26.05.2028", end: "26.05.2028", extra: "01.06.2028-02.06.2028" },
        sommer: { start: "01.07.2028", end: "12.08.2028" }
      },
      "Brandenburg": {
        herbst: { start: "11.10.2027", end: "23.10.2027" },
        weihnachten: { start: "23.12.2027", end: "31.12.2027" },
        winter: { start: "31.01.2028", end: "05.02.2028" },
        ostern: { start: "10.04.2028", end: "22.04.2028" },
        pfingsten: null,
        sommer: { start: "29.06.2028", end: "12.08.2028" }
      },
      "Bremen": {
        herbst: { start: "18.10.2027", end: "30.10.2027" },
        weihnachten: { start: "23.12.2027", end: "08.01.2028" },
        winter: { start: "31.01.2028", end: "01.02.2028" },
        ostern: { start: "10.04.2028", end: "22.04.2028" },
        pfingsten: { start: "26.05.2028", end: "26.05.2028", extra: "06.06.2028" },
        sommer: { start: "20.07.2028", end: "30.08.2028" }
      },
      "Hamburg": {
        herbst: { start: "11.10.2027", end: "22.10.2027" },
        weihnachten: { start: "20.12.2027", end: "31.12.2027" },
        winter: { start: "28.01.2028", end: "28.01.2028" },
        ostern: { start: "06.03.2028", end: "17.03.2028" },
        pfingsten: { start: "22.05.2028", end: "26.05.2028" },
        sommer: { start: "03.07.2028", end: "11.08.2028" }
      },
      "Hessen": {
        herbst: { start: "04.10.2027", end: "16.10.2027" },
        weihnachten: { start: "23.12.2027", end: "11.01.2028" },
        winter: null,
        ostern: { start: "03.04.2028", end: "14.04.2028" },
        pfingsten: null,
        sommer: { start: "03.07.2028", end: "11.08.2028" }
      },
      "Mecklenburg-Vorpommern": {
        herbst: { start: "14.10.2027", end: "23.10.2027" },
        weihnachten: { start: "22.12.2027", end: "04.01.2028" },
        winter: { start: "05.02.2028", end: "17.02.2028", extra: "18.02.2028" },
        ostern: { start: "12.04.2028", end: "21.04.2028" },
        pfingsten: { start: "26.05.2028", end: "26.05.2028", extra: "02.06.2028-06.06.2028" },
        sommer: { start: "26.06.2028", end: "05.08.2028" }
      },
      "Niedersachsen": {
        herbst: { start: "16.10.2027", end: "30.10.2027" },
        weihnachten: { start: "23.12.2027", end: "08.01.2028" },
        winter: { start: "31.01.2028", end: "01.02.2028" },
        ostern: { start: "10.04.2028", end: "22.04.2028" },
        pfingsten: { start: "26.05.2028", end: "26.05.2028", extra: "06.06.2028" },
        sommer: { start: "20.07.2028", end: "30.08.2028" }
      },
      "Nordrhein-Westfalen": {
        herbst: { start: "23.10.2027", end: "06.11.2027" },
        weihnachten: { start: "24.12.2027", end: "08.01.2028" },
        winter: null,
        ostern: { start: "10.04.2028", end: "22.04.2028" },
        pfingsten: null,
        sommer: { start: "10.07.2028", end: "22.08.2028" }
      },
      "Rheinland-Pfalz": {
        herbst: { start: "04.10.2027", end: "15.10.2027" },
        weihnachten: { start: "23.12.2027", end: "07.01.2028" },
        winter: null,
        ostern: { start: "10.04.2028", end: "21.04.2028" },
        pfingsten: null,
        sommer: { start: "03.07.2028", end: "11.08.2028" }
      },
      "Saarland": {
        herbst: { start: "04.10.2027", end: "15.10.2027" },
        weihnachten: { start: "20.12.2027", end: "31.12.2027" },
        winter: { start: "21.02.2028", end: "29.02.2028" },
        ostern: { start: "12.04.2028", end: "21.04.2028" },
        pfingsten: null,
        sommer: { start: "03.07.2028", end: "11.08.2028" }
      },
      "Sachsen": {
        herbst: { start: "11.10.2027", end: "23.10.2027" },
        weihnachten: { start: "23.12.2027", end: "01.01.2028" },
        winter: { start: "14.02.2028", end: "26.02.2028" },
        ostern: { start: "14.04.2028", end: "22.04.2028" },
        pfingsten: { start: "26.05.2028", end: "26.05.2028" },
        sommer: { start: "22.07.2028", end: "01.09.2028" }
      },
      "Sachsen-Anhalt": {
        herbst: { start: "18.10.2027", end: "23.10.2027" },
        weihnachten: { start: "20.12.2027", end: "31.12.2027" },
        winter: { start: "07.02.2028", end: "12.02.2028" },
        ostern: { start: "10.04.2028", end: "22.04.2028" },
        pfingsten: { start: "03.06.2028", end: "10.06.2028" },
        sommer: { start: "22.07.2028", end: "01.09.2028" }
      },
      "Schleswig-Holstein": {
        herbst: { start: "11.10.2027", end: "23.10.2027" },
        weihnachten: { start: "23.12.2027", end: "08.01.2028" },
        winter: null,
        ostern: { start: "03.04.2028", end: "15.04.2028" },
        pfingsten: { start: "26.05.2028", end: "26.05.2028" },
        sommer: { start: "24.06.2028", end: "04.08.2028" }
      },
      "Th\xFCringen": {
        herbst: { start: "09.10.2027", end: "23.10.2027" },
        weihnachten: { start: "23.12.2027", end: "31.12.2027" },
        winter: { start: "07.02.2028", end: "12.02.2028" },
        ostern: { start: "03.04.2028", end: "15.04.2028" },
        pfingsten: { start: "26.05.2028", end: "26.05.2028" },
        sommer: { start: "22.07.2028", end: "01.09.2028" }
      }
    }
  };

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
  function getSchoolYearRange(year) {
    const range = `${year}/${year + 1}`;
    return range in germanSchoolHolidays ? range : null;
  }
  function renderSchoolHolidays(year, bundesland) {
    const container = document.getElementById("school-holidays");
    const schoolYearSpan = document.getElementById("school-year");
    const schoolBundeslandSpan = document.getElementById("school-bundesland");
    if (!container || !schoolYearSpan || !schoolBundeslandSpan) return;
    schoolYearSpan.textContent = year.toString();
    schoolBundeslandSpan.textContent = bundesland;
    const yearRange = getSchoolYearRange(year);
    if (!yearRange || !(bundesland in germanSchoolHolidays[yearRange])) {
      container.innerHTML = '<div class="info-box"><p>Keine Schulferien-Daten f\xFCr dieses Jahr/Bundesland verf\xFCgbar.</p></div>';
      return;
    }
    const holidayData = germanSchoolHolidays[yearRange][bundesland];
    const periodNames = {
      "herbst": "\u{1F342} Herbstferien",
      "weihnachten": "\u{1F384} Weihnachtsferien",
      "winter": "\u26C4 Winterferien",
      "ostern": "\u{1F430} Osterferien",
      "pfingsten": "\u{1F338} Pfingstferien",
      "sommer": "\u2600\uFE0F Sommerferien"
    };
    const periods = [];
    for (const [key, value] of Object.entries(holidayData)) {
      if (value) {
        periods.push({
          name: periodNames[key] || key,
          data: value
        });
      }
    }
    if (periods.length === 0) {
      container.innerHTML = '<div class="info-box"><p>Keine Schulferien-Daten verf\xFCgbar.</p></div>';
      return;
    }
    container.innerHTML = periods.map((period) => {
      const startDate = parseGermanDate(period.data.start);
      const endDate = parseGermanDate(period.data.end);
      const startFormatted = formatDate(startDate.toISOString(), "de-DE");
      const endFormatted = formatDate(endDate.toISOString(), "de-DE");
      let extraInfo = "";
      if (period.data.extra) {
        extraInfo = `<div class="subtitle">Zus\xE4tzlich: ${period.data.extra}</div>`;
      }
      return `
            <div class="holiday-card">
                <h3>${period.name}</h3>
                <div class="date">${startFormatted} - ${endFormatted}</div>
                ${extraInfo}
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
    if (germanStates.includes(bundesland)) {
      renderSchoolHolidays(year, bundesland);
    }
  }
  function renderDownloadLinks() {
    const germanHolidaysContainer = document.getElementById("german-holidays-downloads");
    if (germanHolidaysContainer) {
      germanHolidaysContainer.innerHTML = germanCalenderVariants.map(
        (variant) => `<a href="../output/german_holidays_${stateToFilename(variant)}.ics" class="download-btn">${variant}</a>`
      ).join("");
    }
    const germanSchoolHolidaysContainer = document.getElementById("german-school-holidays-downloads");
    if (germanSchoolHolidaysContainer) {
      germanSchoolHolidaysContainer.innerHTML = germanStates.map(
        (state) => `<a href="../output/school/school_holidays_${stateToFilename(state)}.ics" class="download-btn">${state}</a>`
      ).join("");
    }
  }
  async function init() {
    const yearSelect = document.getElementById("yearSelect");
    const bundeslandSelect = document.getElementById("bundeslandSelect");
    if (!yearSelect || !bundeslandSelect) return;
    populateYearSelect(yearSelect);
    populateBundeslandSelect(germanCalenderVariants, bundeslandSelect);
    renderDownloadLinks();
    updateCalendar();
  }
  window.switchTab = switchTab;
  window.updateCalendar = updateCalendar;
  document.addEventListener("DOMContentLoaded", init);
})();
