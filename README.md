# BoxBoxd 🏁

A Letterboxd-inspired web application for the Formula 1 community, allowing users to rate and review Formula 1 Grand Prix events.

## Features

- **Browse F1 Events**: View Formula 1 Grand Prix events from multiple seasons
- **Race Results**: See race finishing positions with podium highlights and detailed classification
- **Rate & Review**: Rate races on a 5-star scale and write detailed reviews
- **User Profiles**: Create accounts to track your ratings and reviews
- **Smart Filtering**: Filter by year, search by location/circuit, or view only your rated events
- **Real-time Data**: Fetches live F1 data from the OpenF1 API
- **Beautiful UI**: Modern, responsive design inspired by Letterboxd

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data**: OpenF1 API
- **Storage**: LocalStorage (for demo purposes)

## Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd boxboxd
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Create an Account**: Click "Create Account" to set up your profile
2. **Browse Events**: Use the year filter and search to find specific Grand Prix events
3. **Rate Past Events**: Only completed races can be rated (future events show a message)
4. **Write Reviews**: Add detailed reviews alongside your star ratings
5. **Track Progress**: View your rating statistics in the header

## API Integration

BoxBoxd uses the [OpenF1 API](https://openf1.org/) to fetch real Formula 1 data:
- Meeting information (race weekends)
- Circuit details
- Official race names and dates
- Country and location data

## Features in Detail

### Rating System
- 5-star rating scale
- Optional written reviews
- Edit existing ratings
- Community averages

### Race Results
- Final race classification with positions 1-10
- Podium summary with driver acronyms and team colors
- Expandable detailed results view
- Integration with live F1 timing data

### Filtering & Search
- Filter by year (2023-current)
- Search by race name, location, country, or circuit
- "My Ratings Only" filter for logged-in users

### User Experience
- Responsive design for all devices
- Loading states and error handling
- Intuitive interface inspired by Letterboxd
- Local data persistence

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Future Enhancements

- User authentication with database
- Social features (following users, sharing reviews)
- Season-based ratings and awards
- Driver and team ratings
- Photo uploads for race experiences
- Integration with F1 session data (qualifying, practice)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
