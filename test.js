// ...existing code...
        removeExpenseIcon.addEventListener('click', () =>{
            // remove element from DOM
            expenseTracker.removeChild(expenseDiv);

            // update stored users and current user
            const Users = retrieveUsers();
            const current = retrieveCurrentUser();
            if (!current) return;

            // find index of logged-in user in Users
            const uidx = Users.findIndex(u => u.accountNumber === current.accountNumber);
            if (uidx === -1) return;

            // find first matching expense by description, amount and entry
            const eidx = Users[uidx].expenses.findIndex(e =>
                e.description === expense.description &&
                Number(e.amount) === Number(expense.amount) &&
                e.entry === expense.entry
            );

            if (eidx !== -1) {
                // remove expense and reverse its effect on balance
                const removed = Users[uidx].expenses.splice(eidx, 1)[0];

                if (removed.entry === 'credit') {
                    Users[uidx].balance = Number(Users[uidx].balance) - Number(removed.amount);
                } else if (removed.entry === 'debit') {
                    Users[uidx].balance = Number(Users[uidx].balance) + Number(removed.amount);
                }

                // persist changes
                updateUsers(Users);

                // update current user storage and UI
                current.expenses = Users[uidx].expenses;
                current.balance = Users[uidx].balance;
                updateCurrentUser(current);
                accountBalance.textContent = Number(current.balance).toFixed(2);

                if (current.expenses.length === 0) noExpense.classList.add('active');
            }
        });
// ...existing code...