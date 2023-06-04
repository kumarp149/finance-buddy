const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 5000;


const {fetchExpenses, updateExpense, deleteExpenses} = require('./api/expense');
// Serve the static files from the build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle API routes
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/expenses/fetch',async (req,res) => {
  //console.log("FETCH API CALLED");
  const {userId,fromDate,toDate} = req.query;
  //console.log(req.query);
  const response = await fetchExpenses(fromDate,toDate,userId);
  if (response === null){
    return res.status(501).send("Internal server error");
  } else{
    //console.log(response);
    return res.json(response);
  }
})

app.post('/api/expenses/update',async (req,res) => {
  const {expenseId,expenseName,expenseAmount,expenseDate,expenseCategory} = req.body;
  const response = await updateExpense(expenseId,expenseName,expenseAmount,expenseDate,expenseCategory);
  if (response === null){
    return res.status(501).send("Internal server error");
  } else{
    return res.json(response);
  }
})

app.post('/api/expenses/delete',async (req,res) => {
  const expenseIds = req.body.expenseIds;
  console.log("EXPENSEIDS");
  console.log(expenseIds);
  const response = await deleteExpenses(expenseIds);
  console.log(response);
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
