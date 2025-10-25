# Public Holidays Calendar Generator

TypeScript/Node.js based generator for public holiday calendars (ICS files) for Austria and Germany.

## 🚀 Features

- ✅ **Austrian public holidays** (13 national holidays)
- ✅ **German public holidays** (by Bundesland - all 16 states)
- ✅ **Austrian school holidays** (by Bundesland - all 9 regions)
- 📅 Rolling 5-year calendars
- 📅 Individual year calendars
- 🔄 Automatic monthly regeneration via GitHub Actions
- 🎯 Custom UIDs for reliable calendar syncing
- 🌍 Proper German names with umlauts

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm

## 🛠️ Setup

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Generate all calendars
npm run generate

# Or generate specific calendars
npm run generate at      # Austrian holidays only
npm run generate de      # German holidays only
npm run generate school  # School holidays only
```

## 📁 Project Structure

```
src/
├── types/              # TypeScript type definitions
│   ├── Holiday.ts      # Holiday and German state types
│   └── SchoolHoliday.ts # School holiday and Austrian region types
├── calculators/        # Date calculation utilities
│   ├── HolidayCalculator.ts       # Easter & moveable holidays
│   └── SchoolHolidayCalculator.ts # School holiday calculations
├── data/              # Holiday definitions
│   ├── austrianHolidays.ts  # Austrian holiday definitions
│   └── germanHolidays.ts    # German holiday definitions (all 16 states)
├── generators/        # ICS file generators
│   └── IcsGenerator.ts      # Reusable ICS generator
└── index.ts          # Main entry point
```

## 🔧 Development

```bash
# Watch mode for TypeScript compilation
npm run watch

# Run without building (development mode)
npm run dev
```

## 📦 Output

Generated ICS files are saved to:
- `holidays/output/austrian_holidays.ics` - Rolling 5-year calendar
- `holidays/output/austrian_holidays_YYYY.ics` - Individual years (2025-2027)
- `holidays/output/german_holidays_[state].ics` - German state calendars (16 files)
- `holidays/output/school/school_holidays_[region].ics` - School holidays (9 files)

**Total: 29 ICS calendar files**

## 🌍 Proper German Names

The codebase uses authentic German names with proper capitalization and umlauts:

**Austrian Regions:**
- Wien, Niederösterreich, Burgenland, Oberösterreich, Steiermark, Kärnten, Salzburg, Tirol, Vorarlberg

**German States:**
- Baden-Württemberg, Bayern, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein, Thüringen

Filenames are automatically converted to URL-safe format (lowercase, no umlauts).

## 🎯 Custom UIDs

All events have predictable, reproducible UIDs in the format:
```
YYYYMMDD-event-name@public-holidays.github.io
```

Example: `20250101-neujahr-at@public-holidays.github.io`

This ensures:
- Same event always has same UID
- No duplicates when reimporting calendars
- Easy to identify events

## 🤝 Contributing

Contributions welcome! Please ensure:
- TypeScript code compiles without errors
- Code follows existing patterns
- Holiday data is accurate
- Proper German names with umlauts are used

## 📄 License

MIT
