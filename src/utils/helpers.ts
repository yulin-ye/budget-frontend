async function getTodayExpense(userId:number) {
  const response = await fetch(
    `http://localhost:3001/expense?userId=${userId}&onlyToday=1`
  );
  return response.json();
}

async function getAvgExpense(userId: number) {
  const response = await fetch(
    `http://localhost:3001/expense?userId=${userId}`,
    {
      method: 'GET',
      mode: 'cors',
    },
  );
  return response.json();
}

async function getDiffExpense(userId:number) {
  console.log('diff', userId)
  const response = await fetch(
    `http://localhost:3001/differences?userId=${userId}`,
    {
      method: 'GET',
      mode: 'cors',
    }
  );

  return response.json();
}

type UserExpenseType = {
  userId: number,
  expenseData: { [key:string]: number}
};
async function upsertUserExpense(userId:number, params:UserExpenseType) {
  
  const response = await fetch(`http://localhost:3001/expense?userId=${userId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });

  return response.json();
}

export { getTodayExpense, getAvgExpense, getDiffExpense, upsertUserExpense };
