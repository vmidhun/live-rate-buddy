# X-Change Application - Complete Feature Prompt

Use this prompt to recreate the entire X-Change currency converter application with all its features:

---

## Application Prompt

Create a modern, real-time currency exchange rate tracker called "X-Change" with the following complete feature set:

### Core Features

1. **Dashboard View**
   - Display currency exchange rates in a responsive square grid layout (2 columns on mobile, 3 on tablet, 4 on desktop, 5 on xl screens)
   - Each currency card shows: currency code (large, bold at top), exchange rate value (even larger at bottom), and a live indicator dot (small, pulsing, top-right corner)
   - Support both grid and list view modes with smooth transitions
   - Drag and drop to reorder currencies (works in both grid and list modes)
   - Sticky header with gradient logo and app title
   - Sticky mobile footer with controls

2. **Configuration View**
   - Searchable list of all available currencies (150+ currencies)
   - Grid layout showing all currencies with checkboxes
   - Search by currency code or name
   - Visual feedback for selected currencies (highlighted with primary color, ring effect)
   - Show count of selected currencies
   - Back button to return to dashboard

3. **Currency Management**
   - Select base currency from dropdown (all available currencies)
   - Add/remove favorite currencies
   - Reorder currencies via drag and drop
   - Settings persist in localStorage
   - Filter out base currency from displayed list

4. **Conversion Features**
   - Amount input field (defaults to 1)
   - Real-time conversion calculations for all displayed currencies
   - Comparison mode toggle (optional feature)
   - Display converted amounts based on exchange rates

5. **Data Management**
   - Fetch real-time exchange rates from API
   - Cache exchange rates in localStorage
   - Show last updated timestamp
   - Visual indicator for stale/cached data (amber pulsing dot)
   - Refresh button to force update rates
   - Automatic loading states with spinner animation

6. **Design System**
   - Modern gradient design using primary and accent colors
   - Consistent use of semantic color tokens (HSL format)
   - Responsive design for mobile, tablet, and desktop
   - Dark/light mode support via design tokens
   - Smooth animations and transitions
   - Shadow effects with hover states
   - Backdrop blur effects for sticky elements

7. **Mobile Experience**
   - Sticky footer with all main controls (base currency, amount, compare, configure, refresh, view toggle)
   - Icon-based navigation with labels
   - Touch-friendly drag and drop
   - Responsive grid layout
   - Optimized button sizes for touch (h-12)

8. **Desktop Experience**
   - Controls in header area
   - Horizontal layout for base currency and amount inputs
   - Button group with icons and text labels
   - Larger grid with more columns
   - Keyboard navigation support for drag and drop

9. **User Feedback**
   - Toast notifications for actions (currency added/removed, rates updated, errors)
   - Loading states for all async operations
   - Empty state with call-to-action when no currencies selected
   - Error handling with fallback to cached data
   - Visual feedback for interactive elements

10. **Technical Implementation**
    - React with TypeScript
    - Vite for build tooling
    - Tailwind CSS for styling
    - @dnd-kit for drag and drop functionality
    - React Router for routing
    - Sonner for toast notifications
    - shadcn/ui components
    - localStorage for persistence
    - Exchange rate API integration

### File Structure

- Main page: `src/pages/Index.tsx` (state management and data fetching)
- Dashboard: `src/components/DashboardView.tsx` (main view with grid/list)
- Configuration: `src/components/ConfigurationView.tsx` (currency selection)
- Currency Card: `src/components/CurrencyCard.tsx` (square card with drag support)
- Currency Row: `src/components/CurrencyRow.tsx` (list row with drag support)
- Currency data: `src/data/currencyNames.ts` (150+ currency mappings)
- API utilities: `src/utils/currencyApi.ts` (fetch exchange rates)
- Storage utilities: `src/utils/localStorage.ts` (persist settings and rates)
- Types: `src/types/currency.ts` (TypeScript interfaces)

### Design Tokens

Use semantic color tokens defined in `index.css`:
- `--primary`: Main brand color
- `--accent`: Secondary brand color  
- `--background`: Page background
- `--card`: Card background
- `--border`: Border color
- `--muted-foreground`: Secondary text
- Custom shadows: `--shadow-hover`
- Gradients: `from-primary via-accent to-primary`

### UI Components

- Cards with hover effects and shadows
- Buttons with gradient backgrounds (primary to accent)
- Select dropdowns with search
- Input fields for numbers
- Checkboxes with custom styling
- Icons from lucide-react
- Smooth animations and transitions

### User Flow

1. User lands on dashboard with default currencies or empty state
2. Click "Configure" to select currencies
3. Search and select favorite currencies with checkboxes
4. Return to dashboard to see selected currencies
5. Change base currency and amount as needed
6. Drag to reorder currencies
7. Toggle between grid/list views
8. Refresh to get latest rates
9. All settings auto-save to localStorage

---

**Note**: The application should work entirely client-side with no backend required. Use a public exchange rate API (like exchangerate-api.com or similar) for fetching real-time currency data.
