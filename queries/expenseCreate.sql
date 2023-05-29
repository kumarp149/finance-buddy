
CREATE TABLE expenses (
    id VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL NOT NULL,
    date DATE NOT NULL,
    category ENUM('Food', 'Groceries', 'Movies', 'Shopping', 'Games', 'Rent', 'Bills', 'Others') NOT NULL,
    PRIMARY KEY (id)
);