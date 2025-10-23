# Public Holidays Calendar Generator

TypeScript/Node.js based generator for public holiday calendars (ICS files) for Austria and Germany.

## 🚀 Features

- ✅ Austrian public holidays (13 national holidays)
- ✅ German public holidays (by Bundesland)
- 🚧 Austrian school holidays (coming soon)
- 📅 Rolling 5-year calendars
- 📅 Individual year calendars
- 🔄 Automatic monthly regeneration via GitHub Actions

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
npm run generate at    # Austrian holidays only
npm run generate de    # German holidays only
```

## 📁 Project Structure

```
src/
├── types/              # TypeScript type definitions
│   └── Holiday.ts
├── calculators/        # Date calculation utilities
│   └── HolidayCalculator.ts
├── data/              # Holiday definitions
│   ├── austrianHolidays.ts
│   ├── germanHolidays.ts
│   └── schoolHolidays.ts
├── generators/        # ICS file generators
│   └── IcsGenerator.ts
└── index.ts          # Main entry point
```

## 🔧 Development

```bash
# Watch mode for TypeScript compilation
npm run watch

# Run without building
npm run dev
```

## 📦 Output

Generated ICS files are saved to:
- `holidays/output/austrian_holidays.ics` - Rolling 5-year calendar
- `holidays/output/austrian_holidays_YYYY.ics` - Individual years
- `holidays/output/german_holidays_[state].ics` - German state calendars
- `holidays/output/school/school_holidays_[region].ics` - School holidays

## 🤝 Contributing

Contributions welcome! Please ensure:
- TypeScript code compiles without errors
- Code follows existing patterns
- Holiday data is accurate

## 📄 License

MIT
