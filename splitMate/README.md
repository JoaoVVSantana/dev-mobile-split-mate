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
SplitMate is a mobile-first application for managing group events, tracking shared expenses, and calculating debts among friends. It features a modern UI, intuitive navigation, and is built with React Native, Expo, Zustand, and Firebase. All data is persisted in the cloud, enabling real-time sync and multi-device access.

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

splitMate/
│
├── app/                        # Main application source code
│   ├── assets/                 # Static assets (fonts, images)
│   │   ├── fonts/
│   │   └── images/
│   ├── components/             # Reusable UI components (buttons, cards, toasts, etc.)
│   ├── constants/              # App-wide constants (e.g., Colors)
│   ├── core/                   # Core business logic (Event, Friend, Expense managers/services)
│   │   ├── Event/
│   │   ├── Friend/
│   │   └── Expense/
│   ├── core-ui/                # Core UI primitives (themed views, haptic tab, etc.)
│   ├── hooks/                  # Custom React hooks (screen logic, data, color, etc.)
│   ├── persistence/            # Firebase configuration and persistence logic
│   ├── services/               # (Reserved for additional service logic)
│   ├── store/                  # Zustand state management stores
│   ├── styles/                 # Style definitions for screens/components
│   ├── tabs/                   # Tab navigation and related components
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions (formatters, etc.)
│   ├── views/                  # Main app screens (Home, Event, Expense, etc.)
│   └── index.tsx               # App entry point
│
├── android/                    # Android-specific files (e.g., google-services.json)
├── dist/                       # Build output (Expo/React Native)
├── scripts/                    # Utility scripts (e.g., reset-project.js)
├── package.json                # Project metadata and dependencies
├── app.json                    # Expo app configuration
├── tsconfig.json               # TypeScript configuration
├── yarn.lock                   # Yarn lockfile
└── README.md                   # Project documentation
```


## Project Functionalities

- **Event Management**: Create, view, update, and delete events (e.g., parties, trips). Events are persisted in Firebase.
- **Expense Tracking**: Add, update, and delete expenses for events. Assign payers and participants. Expenses are stored as subcollections in Firebase.
- **Friend Management**: Add, view, and remove friends. Friends are persisted in Firebase and can be assigned to events and expenses.
- **Debt Calculation**: Track how much each participant owes per event. Debts are updated in real time as expenses are added or updated.
- **Community Overview**: See all friends and their debts in a dedicated screen.
- **User Authentication**: Anonymous authentication with Firebase for demo purposes; user data is securely stored and synced.
- **Navigation**: Tab-based navigation for Home, Community, User, etc., with custom tab bar and smooth transitions.
- **UI/UX**: Modern, mobile-first interface with custom components, splash/loading screens, and responsive layouts.
- **Feedback & Notifications**:
  - **Toast Feedback**: Success and error messages for all major actions (add, update, delete, errors).
  - **Haptic Feedback**: Soft haptic feedback on tab navigation (iOS).
- **Cloud Sync**: All user data is synced to Firebase, enabling cloud backup and multi-device access.
- **Error Handling**: Robust error handling for all async operations, with user feedback.
- **Testing**: Integration and unit tests using Jest and React Native Testing Library.

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

- **EventService** (`core/Event/EventService.ts`): Fully integrated with Firebase. Supports create, read, update, and delete (CRUD) for events and expenses.
- **FriendService** (`core/Friend/FriendService.ts`): Fully integrated with Firebase. Supports create, read, and delete for friends.
- **Stores** (`store/useCommunityStore.ts`, `store/useCurrentEventStore.ts`): State is managed in-memory using Zustand and hydrated from Firebase on app start. All changes are synced to the database.
- **Database Layer** (`persistence/firebase.ts`): Handles all Firebase configuration and connections.

---

## Further Improvements

- **User Authentication**: Expand to support named user accounts and social login.
- **Advanced Permissions**: Add support for event/friend sharing and permissions.
- **Offline Support**: Enable offline mode with local cache and sync.
- **UI Polish**: Continue to refine UI/UX and add more animations.
- **Advanced Analytics**: Add analytics for user activity and expense trends.
- **Optional: Cloud Sync Enhancements**: Add backup/restore and export features.

---

## Summary Table

| Feature                | Current State         | Needs Improvement? | File(s) to Update                |
|------------------------|----------------------|--------------------|----------------------------------|
| Event CRUD             | Firebase, complete   | No                 | core/Event/EventService.ts       |
| Expense CRUD           | Firebase, complete   | No                 | core/Event/EventService.ts       |
| Friend CRUD            | Firebase, complete   | No                 | core/Friend/FriendService.ts     |
| State Persistence      | Firebase + Zustand   | No                 | store/useCommunityStore.ts, store/useCurrentEventStore.ts |
| Database Layer         | Firebase, complete   | No                 | persistence/firebase.ts          |
| UI Feedback            | Toasts, haptics      | No                 | All screens/components           |
| Cloud Sync             | Firebase, complete   | No                 | All data layers                  |

---

## License

This project is licensed under the MIT License.
