let hrId = null;

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch("http://localhost:8081/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    hrId = data.hrId;

    document.getElementById("login-section").style.display = "none";
    document.getElementById("employee-section").style.display = "block";
    await loadEmployees();

  }
   catch (err) {
    document.getElementById("login-error").innerText = err.message;
  }
}

async function loadEmployees() {
  try {
    const res = await fetch(`http://localhost:8081/employees/${hrId}`);
    const data = await res.json();

    const tbody = document.querySelector("#emp-table tbody");
    tbody.innerHTML = "";

    data.forEach(emp => {
      tbody.innerHTML += `
        <tr>
          <td>${emp.employeeName}</td>
          <td>${emp.department}</td>
          <td>${emp.email}</td>
          <td>${emp.salary}</td>
          <td class="actions">
            <button onclick='editEmployee(${JSON.stringify(emp)})'>Edit</button>
            <button onclick='deleteEmployee(${emp.employeeId})'>Delete</button>
          </td>
        </tr>`;
    });
  } 
  catch (err) {
    console.error("Failed to load employees:", err);
  }
}

document.getElementById("emp-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const employee = {
    employeeName: document.getElementById("emp-name").value,
    department: document.getElementById("emp-dept").value,
    email: document.getElementById("emp-email").value,
    salary: document.getElementById("emp-salary").value
  };

  const editingId = document.getElementById("emp-id").value;
  const method = editingId ? "PUT" : "POST";
  const url = editingId
    ? `http://localhost:8081/employees/${editingId}`
    : `http://localhost:8081/employees/${hrId}`;

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee)
    });

    await res.json(); 

    document.getElementById("emp-form").reset();
    document.getElementById("emp-id").value = "";

    await loadEmployees();

  } 
  catch (err) {
    console.error("Error saving employee:", err);
  }
});

async function deleteEmployee(id) {
  try {
    await fetch(`http://localhost:8081/employees/${id}`, {
      method: "DELETE"
    });
    await loadEmployees();
  } 
  catch (err) {
    console.error("Error deleting employee:", err);
  }
}

function editEmployee(emp) {
  document.getElementById("emp-name").value = emp.employeeName;
  document.getElementById("emp-dept").value = emp.department;
  document.getElementById("emp-email").value = emp.email;
  document.getElementById("emp-salary").value = emp.salary;
  document.getElementById("emp-id").value = emp.employeeId;
}
