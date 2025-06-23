# SplitMate

## Table of Contents
- [About](#about)
- [How to Run the Project](#how-to-run-the-project)
- [Project Functionalities](#project-functionalities)
- [Entities (Types)](#entities-types)
- [Database Persistence Status](#database-persistence-status)
- [Further Improvements](#further-improvements)

---

## About
SplitMate is a mobile-first application for managing group events, tracking shared expenses, and calculating debts among friends. It features a modern UI, intuitive navigation, and is built with React Native, Expo, Zustand, and Firebase.

---

## How to Run the Project

### Prerequisites
- **Node.js** (Recommended: v18+)
- **Yarn** or **npm**
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- (For mobile) **Android Studio** or **Xcode** for emulators, or a physical device with Expo Go app.

### Setup & Running

```bash
cd splitMate
yarn install         # or npm install
yarn start           # or npm start
```

- To run on Android: `yarn android`
- To run on iOS: `yarn ios`
- To run on Web: `yarn web`

#### Resetting the Project
```bash
yarn reset-project
```

---

## 🏗️ Project Structure

```
splitMate/
├── app/
│   ├── assets/           # Images, fonts, and static assets
│   ├── components/       # Reusable UI components
│   ├── config/          # Configuration files (env, axios)
│   ├── constants/       # App constants (colors, API endpoints)
│   ├── core/           # Business logic services
│   ├── hooks/          # Custom React hooks
│   ├── persistence/    # Database configuration
│   ├── services/       # API service layer
│   ├── store/          # State management (Zustand)
│   ├── styles/         # Style definitions
│   ├── tabs/           # Main tab screens
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── views/          # Screen components
├── scripts/            # Build and utility scripts
└── package.json        # Dependencies and scripts
```


## Project Functionalities

- **Event Management**: Create, view, and manage events (e.g., parties, trips).
- **Expense Tracking**: Add expenses to events, assign payers and participants.
- **Friend Management**: Add and view friends, assign them to events and expenses.
- **Debt Calculation**: Track how much each participant owes per event.
- **Community Overview**: See all friends and their debts.
- **Navigation**: Tab-based navigation for Home, Community, User, etc.
- **UI/UX**: Modern, mobile-first interface with custom components and feedback (toasts, haptics).

---

## Entities (Types)

### `TEvent`
```ts
export interface TEvent {
  id: string;
  title: string;
  date: string;
  expenses: TExpense[];
  participants: TFriend[];
}
```

### `TFriend`
```ts
export interface TFriend {
  id: string;
  name: string;
  email?: string;
  debts?: TDebt[];
}
```

### `TExpense`
```ts
export interface TExpense {
  id: string;
  name: string;
  value: number;
  isPayed: boolean;
  participants: IExpenseParticipant[];
  owner: TFriend;
}
```

### `IExpenseParticipant`
```ts
export interface IExpenseParticipant extends TFriend {
  hasPaid: boolean;
}
```

### `TDebt`
```ts
export interface TDebt {
  event: TEvent;
  amount: number;
}
```

### `TEventStore`
```ts
interface TEventStore {
  eventId: string | null;
  setEventId: (id: string) => void;
  clearEventId: () => void;
}
```

### `EFormatTypes`
```ts
export enum EFormatTypes {
  Currency = 'currency',
  Date = 'date',
}
```

---

## Database Persistence Status

### Current State

- **EventService** (`core/Event/EventService.ts`): Uses hardcoded mock data for events and expenses. No real database persistence.
- **FriendService** (`core/Friend/FriendService.ts`): Uses a hardcoded array of friends. No real database persistence.
- **Stores** (`store/useCommunityStore.ts`, `store/useCurrentEventStore.ts`): State is managed in-memory using Zustand. No persistent storage.
- **Database Layer** (`persistence/database.ts`): Firebase tables are NOT defined, and not actively used by services or stores.

### Where Persistence is Needed

- **EventService**: Should fetch, create, update, and delete events from the Firebase.
- **FriendService**: Should fetch, create, update, and delete friends from the Firebase.
- **Expense Management**: Expenses should be stored and retrieved from the database, not just in-memory.
- **State Stores**: Should hydrate from and persist to the database, not just keep state in memory.

---
## ✨ Features Implemented

### 🏠 Home Screen
**Location**: `app/tabs/HomeScreen.tsx`

**Features**:
- **Event List Display**: Shows all user events in a grid or horizontal layout
- **Search Functionality**: Filter events by name using the search bar
- **Event Management**: Add new events and edit existing ones
- **Event Deletion**: Delete events with confirmation toast
- **Responsive Layout**: Automatically adjusts layout based on number of events
- **Navigation**: Tap events to view details

**Technical Details**:
- Uses custom hook `useHomeScreen` for state management
- Implements toast notifications for user feedback
- Responsive design with dynamic layout switching
- Search filtering with real-time updates

### 👥 Community Screen
**Location**: `app/tabs/CommunityScreen.tsx`

**Features**:
- **Friend Management**: Add new friends to the community
- **Friend List Display**: Shows all added friends with names and emails
- **Form Validation**: Input validation for friend details
- **Scrollable Friend List**: Handles large friend lists with scrolling

**Technical Details**:
- Uses `useCommunityScreen` hook for state management
- Implements form components with consistent styling
- Stores friend data in local state and community store
- Email field is optional for friend registration

### 👤 User Profile Screen
**Location**: `app/tabs/UserScreen.tsx`

**Features**:
- **User Information Display**: Shows user name, email, and total debt
- **Profile Avatar**: Displays user profile picture
- **Edit Profile**: Navigation to edit user information
- **Debt Summary**: Shows total amount owed across all events

**Technical Details**:
- Uses `useUserInformationScreen` hook
- Implements navigation to edit profile screen
- Displays user avatar with fallback styling
- Shows debt calculations from all events

### 📅 Event Management
**Location**: `app/views/NewEventScreen.tsx` and `app/views/EventScreen.tsx`

**Features**:
- **Event Creation**: Create new events with name, date, and participants
- **Participant Selection**: Multi-select participants from friend list
- **Date Formatting**: Automatic date format validation (DD/MM/YYYY)
- **Event Details View**: Display event information and expenses

**Technical Details**:
- Uses `useNewEventScreen` hook for form management
- Implements date formatting with `EFormatTypes.Date`
- Participant selection with checkboxes
- Form validation before event creation

### 💰 Expense Management
**Location**: `app/views/NewExpenseScreen.tsx` and `app/views/ExpenseScreen.tsx`

**Features**:
- **Expense Creation**: Add new expenses with name, value, and participants
- **Currency Formatting**: Automatic currency formatting (R$ 0,00)
- **Participant Assignment**: Select who participated in the expense
- **Expense Details**: View expense breakdown and individual shares
- **Payment Status**: Track payment status for each participant
- **Pay Button**: Mark expenses as paid

**Technical Details**:
- Uses `useNewExpenseScreen` and `useExpenseScreen` hooks
- Implements currency formatting with `EFormatTypes.Currency`
- Calculates individual shares automatically
- Shows payment status and debt calculations

### 🗄️ Data Persistence
**Location**: `app/persistence/database.ts`

**Features**:
- **Firebase Database**: To be implemented. Non-local data storage using Firebase
- **Table Management**: Users, events, and expenses tables
- **Foreign Key Relationships**: Proper data relationships

**Technical Details**:
- should use Firebase for database operations
- Implements proper table schemas with relationships
- Supports offline-first architecture
- Handles data migrations and updates

### 🔄 State Management
**Location**: `app/store/`

**Features**:
- **Zustand Store**: Lightweight state management
- **Community Store**: Manages friends and user data
- **Event Store**: Handles current event state
- **Debt Calculations**: Automatic debt tracking and updates

**Technical Details**:
- Uses Zustand for state management
- Implements reactive debt calculations
- Handles friend and event relationships
- Provides type-safe state access

## Further Improvements

### To Make the App 100% Functional:

1. **Implement Database Integration**
   - Refactor `EventService` and `FriendService` to use the Firebase database via `persistence/database.ts`.
   - Implement CRUD operations for events, friends, and expenses.

2. **Persist State**
   - On app start, hydrate Zustand stores from the database.
   - On changes (add, update, delete), sync state to the database.

3. **Expense Creation**
   - Ensure `useCreateNewExpense` writes new expenses to the database, not just updates in-memory state.

4. **Event Creation**
   - Ensure `useNewEventScreen` writes new events to the database.

5. **Friend Registration**
   - Ensure new friends are persisted to the database.

6. **Data Consistency**
   - Update all related entities (e.g., when a friend is deleted, update events/expenses accordingly).

7. **Error Handling & Feedback**
   - Add robust error handling for all async operations.
   - Provide user feedback for database errors.

8. **Testing**
   - Add integration tests for database operations.
   - Ensure UI reflects the true state of the database.

9. **Optional: Cloud Sync**
   - Consider adding cloud sync or backup for user data.

---

## Summary Table

| Feature                | Current State         | Needs Improvement? | File(s) to Update                |
|------------------------|----------------------|--------------------|----------------------------------|
| Event CRUD             | Mocked, in-memory    | Yes                | core/Event/EventService.ts       |
| Expense CRUD           | Mocked, in-memory    | Yes                | core/Event/EventService.ts, hooks/Expense/useCreateNewExpense.ts |
| Friend CRUD            | Mocked, in-memory    | Yes                | core/Friend/FriendService.ts     |
| State Persistence      | In-memory (Zustand)  | Yes                | store/useCommunityStore.ts, store/useCurrentEventStore.ts |
| Database Layer         | Unefined,unused      | Yes                | persistence/database.ts          |
| UI Feedback            | Partial              | Yes                | All screens/components           |

---

## License

This project is licensed under the MIT License.
