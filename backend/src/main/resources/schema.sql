-- Friends table
CREATE TABLE IF NOT EXISTS friends (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

-- Event participants (many-to-many relationship between events and friends)
CREATE TABLE IF NOT EXISTS event_participants (
    event_id VARCHAR(36),
    friend_id VARCHAR(36),
    PRIMARY KEY (event_id, friend_id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES friends(id) ON DELETE CASCADE
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    is_payed BOOLEAN DEFAULT FALSE,
    owner_id VARCHAR(36) NOT NULL,
    event_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES friends(id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Expense participants (many-to-many relationship between expenses and friends with additional attributes)
CREATE TABLE IF NOT EXISTS expense_participants (
    expense_id VARCHAR(36),
    friend_id VARCHAR(36),
    has_paid BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (expense_id, friend_id),
    FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES friends(id) ON DELETE CASCADE
);

-- Debts table
CREATE TABLE IF NOT EXISTS debts (
    id VARCHAR(36) PRIMARY KEY,
    friend_id VARCHAR(36) NOT NULL,
    event_id VARCHAR(36) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (friend_id) REFERENCES friends(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
); 