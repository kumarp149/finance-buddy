const express = require('express');
const app = express();
const path = require('path');
const port = 5000;


const {fetchExpenses, updateExpense, deleteExpenses} = require('./api/expense');
// Serve the static files from the build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle API routes
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/expenses/fetch',async (req,res) => {
  const {userId,fromDate,toDate} = req.query;
  const response = fetchExpenses(fromDate,toDate,userId);
  if (response === null){
    return res.status(501).send("Internal server error");
  } else{
    return res.json(response);
  }
})

app.post('/api/expenses/update',(req,res) => {
  const {expenseId,expenseName,expenseAmount,expenseDate,expenseCategory} = req.body;
  const response = updateExpense(expenseId,expenseName,expenseAmount,expenseDate,expenseCategory);
  if (response === null){
    return res.status(501).send("Internal server error");
  } else{
    return res.json(response);
  }
})

app.post('/api/expenses/delete',(req,res) => {
  const expenseId = req.body.expenseId;
  const response = deleteExpenses(expenseId);
  if (response === null){
    return res.status(501).send("Internal server error");
  } else{
    return res.json(response);
  }
})

// Serve the index.html file if the route is not recognized
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
