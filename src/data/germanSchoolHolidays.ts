export interface SchoolHolidayPeriod {
    start: string; // Format: DD.MM.YYYY
    end: string;
    extra?: string; // Für einzelne Zusatztage
}

export interface SchoolHolidaysYear {
    herbst: SchoolHolidayPeriod | null;
    weihnachten: SchoolHolidayPeriod | null;
    winter: SchoolHolidayPeriod | null;
    ostern: SchoolHolidayPeriod | null;
    pfingsten: SchoolHolidayPeriod | null;
    sommer: SchoolHolidayPeriod | null;
}

// extracted from https://www.kmk.org/service/ferien.html
// as of now I don't think there is a better source for this data, the legal situation doesn't
// allow for an automated logic like in austrian law.

export const germanSchoolHolidays: Record<string, Record<string, SchoolHolidaysYear>> = {
    "2025/2026": {
        "Baden-Württemberg": {
            herbst: {start: "27.10.2025", end: "30.10.2025", extra: "31.10.2025"},
            weihnachten: {start: "22.12.2025", end: "05.01.2026"},
            winter: null,
            ostern: {start: "30.03.2026", end: "11.04.2026"},
            pfingsten: {start: "26.05.2026", end: "05.06.2026"},
            sommer: {start: "30.07.2026", end: "12.09.2026"}
        },
        "Bayern": {
            herbst: {start: "03.11.2025", end: "07.11.2025"},
            weihnachten: {start: "22.12.2025", end: "05.01.2026"},
            winter: {start: "16.02.2026", end: "20.02.2026"},
            ostern: {start: "30.03.2026", end: "10.04.2026"},
            pfingsten: {start: "26.05.2026", end: "05.06.2026"},
            sommer: {start: "03.08.2026", end: "14.09.2026"}
        },
        "Berlin": {
            herbst: {start: "20.10.2025", end: "01.11.2025"},
            weihnachten: {start: "22.12.2025", end: "02.01.2026"},
            winter: {start: "02.02.2026", end: "07.02.2026"},
            ostern: {start: "30.03.2026", end: "10.04.2026"},
            pfingsten: {start: "15.05.2026", end: "15.05.2026", extra: "26.05.2026"},
            sommer: {start: "09.07.2026", end: "22.08.2026"}
        },
        "Brandenburg": {
            herbst: {start: "20.10.2025", end: "01.11.2025"},
            weihnachten: {start: "22.12.2025", end: "02.01.2026"},
            winter: {start: "02.02.2026", end: "07.02.2026"},
            ostern: {start: "30.03.2026", end: "10.04.2026"},
            pfingsten: {start: "26.05.2026", end: "26.05.2026"},
            sommer: {start: "09.07.2026", end: "22.08.2026"}
        },
        "Bremen": {
            herbst: {start: "13.10.2025", end: "25.10.2025"},
            weihnachten: {start: "22.12.2025", end: "05.01.2026"},
            winter: {start: "02.02.2026", end: "03.02.2026"},
            ostern: {start: "23.03.2026", end: "07.04.2026"},
            pfingsten: {start: "15.05.2026", end: "15.05.2026", extra: "26.05.2026"},
            sommer: {start: "02.07.2026", end: "12.08.2026"}
        },
        "Hamburg": {
            herbst: {start: "20.10.2025", end: "31.10.2025"},
            weihnachten: {start: "17.12.2025", end: "02.01.2026"},
            winter: {start: "30.01.2026", end: "30.01.2026"},
            ostern: {start: "02.03.2026", end: "13.03.2026"},
            pfingsten: {start: "11.05.2026", end: "15.05.2026"},
            sommer: {start: "09.07.2026", end: "19.08.2026"}
        },
        "Hessen": {
            herbst: {start: "06.10.2025", end: "18.10.2025"},
            weihnachten: {start: "22.12.2025", end: "10.01.2026"},
            winter: null,
            ostern: {start: "30.03.2026", end: "10.04.2026"},
            pfingsten: null,
            sommer: {start: "29.06.2026", end: "07.08.2026"}
        },
        "Mecklenburg-Vorpommern": {
            herbst: {start: "20.10.2025", end: "24.10.2025", extra: "02.10.2025, 03.11.2025"},
            weihnachten: {start: "20.12.2025", end: "03.01.2026"},
            winter: {start: "09.02.2026", end: "20.02.2026"},
            ostern: {start: "30.03.2026", end: "08.04.2026"},
            pfingsten: {start: "22.05.2026", end: "26.05.2026", extra: "15.05.2026"},
            sommer: {start: "13.07.2026", end: "22.08.2026"}
        },
        "Niedersachsen": {
            herbst: {start: "13.10.2025", end: "25.10.2025"},
            weihnachten: {start: "22.12.2025", end: "05.01.2026"},
            winter: {start: "02.02.2026", end: "03.02.2026"},
            ostern: {start: "23.03.2026", end: "07.04.2026"},
            pfingsten: {start: "15.05.2026", end: "15.05.2026", extra: "26.05.2026"},
            sommer: {start: "02.07.2026", end: "12.08.2026"}
        },
        "Nordrhein-Westfalen": {
            herbst: {start: "13.10.2025", end: "25.10.2025"},
            weihnachten: {start: "22.12.2025", end: "06.01.2026"},
            winter: null,
            ostern: {start: "30.03.2026", end: "11.04.2026"},
            pfingsten: {start: "26.05.2026", end: "26.05.2026"},
            sommer: {start: "20.07.2026", end: "01.09.2026"}
        },
        "Rheinland-Pfalz": {
            herbst: {start: "13.10.2025", end: "24.10.2025"},
            weihnachten: {start: "22.12.2025", end: "07.01.2026"},
            winter: null,
            ostern: {start: "30.03.2026", end: "10.04.2026"},
            pfingsten: null,
            sommer: {start: "29.06.2026", end: "07.08.2026"}
        },
        "Saarland": {
            herbst: {start: "13.10.2025", end: "24.10.2025"},
            weihnachten: {start: "22.12.2025", end: "02.01.2026"},
            winter: {start: "16.02.2026", end: "20.02.2026"},
            ostern: {start: "07.04.2026", end: "17.04.2026"},
            pfingsten: null,
            sommer: {start: "29.06.2026", end: "07.08.2026"}
        },
        "Sachsen": {
            herbst: {start: "06.10.2025", end: "18.10.2025"},
            weihnachten: {start: "22.12.2025", end: "02.01.2026"},
            winter: {start: "09.02.2026", end: "21.02.2026"},
            ostern: {start: "03.04.2026", end: "10.04.2026"},
            pfingsten: {start: "15.05.2026", end: "15.05.2026"},
            sommer: {start: "04.07.2026", end: "14.08.2026"}
        },
        "Sachsen-Anhalt": {
            herbst: {start: "13.10.2025", end: "25.10.2025"},
            weihnachten: {start: "22.12.2025", end: "05.01.2026"},
            winter: {start: "31.01.2026", end: "06.02.2026"},
            ostern: {start: "30.03.2026", end: "04.04.2026"},
            pfingsten: {start: "26.05.2026", end: "29.05.2026"},
            sommer: {start: "04.07.2026", end: "14.08.2026"}
        },
        "Schleswig-Holstein": {
            herbst: {start: "20.10.2025", end: "30.10.2025"},
            weihnachten: {start: "19.12.2025", end: "06.01.2026"},
            winter: null,
            ostern: {start: "26.03.2026", end: "10.04.2026"},
            pfingsten: {start: "15.05.2026", end: "15.05.2026"},
            sommer: {start: "04.07.2026", end: "15.08.2026"}
        },
        "Thüringen": {
            herbst: {start: "06.10.2025", end: "18.10.2025"},
            weihnachten: {start: "22.12.2025", end: "03.01.2026"},
            winter: {start: "16.02.2026", end: "21.02.2026"},
            ostern: {start: "07.04.2026", end: "17.04.2026"},
            pfingsten: {start: "15.05.2026", end: "15.05.2026"},
            sommer: {start: "04.07.2026", end: "14.08.2026"}
        }
    },
    "2026/2027": {
        "Baden-Württemberg": {
            herbst: {start: "26.10.2026", end: "30.10.2026", extra: "31.10.2026"},
            weihnachten: {start: "23.12.2026", end: "09.01.2027"},
            winter: null,
            ostern: {start: "25.03.2027", end: "03.04.2027", extra: "30.03.2027"},
            pfingsten: {start: "18.05.2027", end: "29.05.2027"},
            sommer: {start: "29.07.2027", end: "11.09.2027"}
        },
        "Bayern": {
            herbst: {start: "02.11.2026", end: "06.11.2026"},
            weihnachten: {start: "24.12.2026", end: "08.01.2027"},
            winter: {start: "08.02.2027", end: "12.02.2027"},
            ostern: {start: "22.03.2027", end: "02.04.2027"},
            pfingsten: {start: "18.05.2027", end: "28.05.2027"},
            sommer: {start: "02.08.2027", end: "13.09.2027"}
        },
        "Berlin": {
            herbst: {start: "19.10.2026", end: "31.10.2026"},
            weihnachten: {start: "23.12.2026", end: "02.01.2027"},
            winter: {start: "01.02.2027", end: "06.02.2027"},
            ostern: {start: "22.03.2027", end: "02.04.2027"},
            pfingsten: {start: "07.05.2027", end: "07.05.2027", extra: "18.05.2027-19.05.2027"},
            sommer: {start: "01.07.2027", end: "14.08.2027"}
        },
        "Brandenburg": {
            herbst: {start: "19.10.2026", end: "30.10.2026"},
            weihnachten: {start: "23.12.2026", end: "02.01.2027"},
            winter: {start: "01.02.2027", end: "06.02.2027"},
            ostern: {start: "22.03.2027", end: "03.04.2027"},
            pfingsten: {start: "18.05.2027", end: "18.05.2027"},
            sommer: {start: "01.07.2027", end: "14.08.2027"}
        },
        "Bremen": {
            herbst: {start: "12.10.2026", end: "24.10.2026"},
            weihnachten: {start: "23.12.2026", end: "09.01.2027"},
            winter: {start: "01.02.2027", end: "02.02.2027"},
            ostern: {start: "22.03.2027", end: "03.04.2027"},
            pfingsten: {start: "07.05.2027", end: "07.05.2027", extra: "18.05.2027"},
            sommer: {start: "08.07.2027", end: "18.08.2027"}
        },
        "Hamburg": {
            herbst: {start: "19.10.2026", end: "30.10.2026"},
            weihnachten: {start: "21.12.2026", end: "01.01.2027"},
            winter: {start: "29.01.2027", end: "29.01.2027"},
            ostern: {start: "01.03.2027", end: "12.03.2027"},
            pfingsten: {start: "07.05.2027", end: "14.05.2027"},
            sommer: {start: "01.07.2027", end: "11.08.2027"}
        },
        "Hessen": {
            herbst: {start: "05.10.2026", end: "17.10.2026"},
            weihnachten: {start: "23.12.2026", end: "12.01.2027"},
            winter: null,
            ostern: {start: "22.03.2027", end: "02.04.2027"},
            pfingsten: null,
            sommer: {start: "28.06.2027", end: "06.08.2027"}
        },
        "Mecklenburg-Vorpommern": {
            herbst: {start: "15.10.2026", end: "24.10.2026"},
            weihnachten: {start: "21.12.2026", end: "02.01.2027"},
            winter: {start: "08.02.2027", end: "19.02.2027"},
            ostern: {start: "24.03.2027", end: "02.04.2027"},
            pfingsten: {start: "07.05.2027", end: "07.05.2027", extra: "14.05.2027-18.05.2027"},
            sommer: {start: "05.07.2027", end: "14.08.2027"}
        },
        "Niedersachsen": {
            herbst: {start: "12.10.2026", end: "24.10.2026"},
            weihnachten: {start: "23.12.2026", end: "09.01.2027"},
            winter: {start: "01.02.2027", end: "02.02.2027"},
            ostern: {start: "22.03.2027", end: "03.04.2027"},
            pfingsten: {start: "07.05.2027", end: "07.05.2027", extra: "18.05.2027"},
            sommer: {start: "08.07.2027", end: "18.08.2027"}
        },
        "Nordrhein-Westfalen": {
            herbst: {start: "17.10.2026", end: "31.10.2026"},
            weihnachten: {start: "23.12.2026", end: "06.01.2027"},
            winter: null,
            ostern: {start: "22.03.2027", end: "03.04.2027"},
            pfingsten: {start: "18.05.2027", end: "18.05.2027"},
            sommer: {start: "19.07.2027", end: "31.08.2027"}
        },
        "Rheinland-Pfalz": {
            herbst: {start: "05.10.2026", end: "16.10.2026"},
            weihnachten: {start: "23.12.2026", end: "08.01.2027"},
            winter: null,
            ostern: {start: "22.03.2027", end: "02.04.2027"},
            pfingsten: null,
            sommer: {start: "28.06.2027", end: "06.08.2027"}
        },
        "Saarland": {
            herbst: {start: "05.10.2026", end: "16.10.2026"},
            weihnachten: {start: "21.12.2026", end: "31.12.2026"},
            winter: {start: "08.02.2027", end: "12.02.2027"},
            ostern: {start: "30.03.2027", end: "09.04.2027"},
            pfingsten: null,
            sommer: {start: "28.06.2027", end: "06.08.2027"}
        },
        "Sachsen": {
            herbst: {start: "12.10.2026", end: "24.10.2026"},
            weihnachten: {start: "23.12.2026", end: "02.01.2027"},
            winter: {start: "08.02.2027", end: "19.02.2027"},
            ostern: {start: "26.03.2027", end: "02.04.2027"},
            pfingsten: {start: "07.05.2027", end: "07.05.2027", extra: "15.05.2027-18.05.2027"},
            sommer: {start: "10.07.2027", end: "20.08.2027"}
        },
        "Sachsen-Anhalt": {
            herbst: {start: "19.10.2026", end: "30.10.2026"},
            weihnachten: {start: "21.12.2026", end: "02.01.2027"},
            winter: {start: "01.02.2027", end: "06.02.2027"},
            ostern: {start: "22.03.2027", end: "27.03.2027"},
            pfingsten: {start: "15.05.2027", end: "22.05.2027"},
            sommer: {start: "10.07.2027", end: "20.08.2027"}
        },
        "Schleswig-Holstein": {
            herbst: {start: "12.10.2026", end: "24.10.2026"},
            weihnachten: {start: "21.12.2026", end: "06.01.2027"},
            winter: null,
            ostern: {start: "30.03.2027", end: "10.04.2027"},
            pfingsten: {start: "07.05.2027", end: "07.05.2027"},
            sommer: {start: "03.07.2027", end: "14.08.2027"}
        },
        "Thüringen": {
            herbst: {start: "12.10.2026", end: "24.10.2026"},
            weihnachten: {start: "23.12.2026", end: "02.01.2027"},
            winter: {start: "01.02.2027", end: "06.02.2027"},
            ostern: {start: "22.03.2027", end: "03.04.2027"},
            pfingsten: {start: "07.05.2027", end: "07.05.2027"},
            sommer: {start: "10.07.2027", end: "20.08.2027"}
        }
    },
    "2027/2028": {
        "Baden-Württemberg": {
            herbst: {start: "02.11.2027", end: "06.11.2027"},
            weihnachten: {start: "23.12.2027", end: "08.01.2028"},
            winter: null,
            ostern: {start: "13.04.2028", end: "13.04.2028", extra: "18.04.2028-22.04.2028"},
            pfingsten: {start: "06.06.2028", end: "17.06.2028"},
            sommer: {start: "27.07.2028", end: "09.09.2028"}
        },
        "Bayern": {
            herbst: {start: "02.11.2027", end: "05.11.2027"},
            weihnachten: {start: "24.12.2027", end: "07.01.2028"},
            winter: {start: "28.02.2028", end: "03.03.2028"},
            ostern: {start: "10.04.2028", end: "21.04.2028"},
            pfingsten: {start: "06.06.2028", end: "16.06.2028"},
            sommer: {start: "31.07.2028", end: "11.09.2028"}
        },
        "Berlin": {
            herbst: {start: "11.10.2027", end: "23.10.2027"},
            weihnachten: {start: "22.12.2027", end: "31.12.2027"},
            winter: {start: "31.01.2028", end: "05.02.2028"},
            ostern: {start: "10.04.2028", end: "22.04.2028"},
            pfingsten: {start: "26.05.2028", end: "26.05.2028", extra: "01.06.2028-02.06.2028"},
            sommer: {start: "01.07.2028", end: "12.08.2028"}
        },
        "Brandenburg": {
            herbst: {start: "11.10.2027", end: "23.10.2027"},
            weihnachten: {start: "23.12.2027", end: "31.12.2027"},
            winter: {start: "31.01.2028", end: "05.02.2028"},
            ostern: {start: "10.04.2028", end: "22.04.2028"},
            pfingsten: null,
            sommer: {start: "29.06.2028", end: "12.08.2028"}
        },
        "Bremen": {
            herbst: {start: "18.10.2027", end: "30.10.2027"},
            weihnachten: {start: "23.12.2027", end: "08.01.2028"},
            winter: {start: "31.01.2028", end: "01.02.2028"},
            ostern: {start: "10.04.2028", end: "22.04.2028"},
            pfingsten: {start: "26.05.2028", end: "26.05.2028", extra: "06.06.2028"},
            sommer: {start: "20.07.2028", end: "30.08.2028"}
        },
        "Hamburg": {
            herbst: {start: "11.10.2027", end: "22.10.2027"},
            weihnachten: {start: "20.12.2027", end: "31.12.2027"},
            winter: {start: "28.01.2028", end: "28.01.2028"},
            ostern: {start: "06.03.2028", end: "17.03.2028"},
            pfingsten: {start: "22.05.2028", end: "26.05.2028"},
            sommer: {start: "03.07.2028", end: "11.08.2028"}
        },
        "Hessen": {
            herbst: {start: "04.10.2027", end: "16.10.2027"},
            weihnachten: {start: "23.12.2027", end: "11.01.2028"},
            winter: null,
            ostern: {start: "03.04.2028", end: "14.04.2028"},
            pfingsten: null,
            sommer: {start: "03.07.2028", end: "11.08.2028"}
        },
        "Mecklenburg-Vorpommern": {
            herbst: {start: "14.10.2027", end: "23.10.2027"},
            weihnachten: {start: "22.12.2027", end: "04.01.2028"},
            winter: {start: "05.02.2028", end: "17.02.2028", extra: "18.02.2028"},
            ostern: {start: "12.04.2028", end: "21.04.2028"},
            pfingsten: {start: "26.05.2028", end: "26.05.2028", extra: "02.06.2028-06.06.2028"},
            sommer: {start: "26.06.2028", end: "05.08.2028"}
        },
        "Niedersachsen": {
            herbst: {start: "16.10.2027", end: "30.10.2027"},
            weihnachten: {start: "23.12.2027", end: "08.01.2028"},
            winter: {start: "31.01.2028", end: "01.02.2028"},
            ostern: {start: "10.04.2028", end: "22.04.2028"},
            pfingsten: {start: "26.05.2028", end: "26.05.2028", extra: "06.06.2028"},
            sommer: {start: "20.07.2028", end: "30.08.2028"}
        },
        "Nordrhein-Westfalen": {
            herbst: {start: "23.10.2027", end: "06.11.2027"},
            weihnachten: {start: "24.12.2027", end: "08.01.2028"},
            winter: null,
            ostern: {start: "10.04.2028", end: "22.04.2028"},
            pfingsten: null,
            sommer: {start: "10.07.2028", end: "22.08.2028"}
        },
        "Rheinland-Pfalz": {
            herbst: {start: "04.10.2027", end: "15.10.2027"},
            weihnachten: {start: "23.12.2027", end: "07.01.2028"},
            winter: null,
            ostern: {start: "10.04.2028", end: "21.04.2028"},
            pfingsten: null,
            sommer: {start: "03.07.2028", end: "11.08.2028"}
        },
        "Saarland": {
            herbst: {start: "04.10.2027", end: "15.10.2027"},
            weihnachten: {start: "20.12.2027", end: "31.12.2027"},
            winter: {start: "21.02.2028", end: "29.02.2028"},
            ostern: {start: "12.04.2028", end: "21.04.2028"},
            pfingsten: null,
            sommer: {start: "03.07.2028", end: "11.08.2028"}
        },
        "Sachsen": {
            herbst: {start: "11.10.2027", end: "23.10.2027"},
            weihnachten: {start: "23.12.2027", end: "01.01.2028"},
            winter: {start: "14.02.2028", end: "26.02.2028"},
            ostern: {start: "14.04.2028", end: "22.04.2028"},
            pfingsten: {start: "26.05.2028", end: "26.05.2028"},
            sommer: {start: "22.07.2028", end: "01.09.2028"}
        },
        "Sachsen-Anhalt": {
            herbst: {start: "18.10.2027", end: "23.10.2027"},
            weihnachten: {start: "20.12.2027", end: "31.12.2027"},
            winter: {start: "07.02.2028", end: "12.02.2028"},
            ostern: {start: "10.04.2028", end: "22.04.2028"},
            pfingsten: {start: "03.06.2028", end: "10.06.2028"},
            sommer: {start: "22.07.2028", end: "01.09.2028"}
        },
        "Schleswig-Holstein": {
            herbst: {start: "11.10.2027", end: "23.10.2027"},
            weihnachten: {start: "23.12.2027", end: "08.01.2028"},
            winter: null,
            ostern: {start: "03.04.2028", end: "15.04.2028"},
            pfingsten: {start: "26.05.2028", end: "26.05.2028"},
            sommer: {start: "24.06.2028", end: "04.08.2028"}
        },
        "Thüringen": {
            herbst: {start: "09.10.2027", end: "23.10.2027"},
            weihnachten: {start: "23.12.2027", end: "31.12.2027"},
            winter: {start: "07.02.2028", end: "12.02.2028"},
            ostern: {start: "03.04.2028", end: "15.04.2028"},
            pfingsten: {start: "26.05.2028", end: "26.05.2028"},
            sommer: {start: "22.07.2028", end: "01.09.2028"}
        }
    }
};
