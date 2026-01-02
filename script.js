const API = "http://localhost:5000";

// Add Student
async function addStudent() {
  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const className = document.getElementById("className").value;

  const res = await fetch(`${API}/students/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, rollNumber: roll, className })
  });

  const data = await res.json();
  alert(data.message || "Student Added");
}

// Mark Attendance
async function markAttendance() {
  const roll = document.getElementById("rollAttend").value;
  const status = document.getElementById("status").value;

  const res = await fetch(`${API}/students/attendance/${roll}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  const data = await res.json();
  alert(data.message);
}

// Get Attendance Percentage
async function getPercentage() {
  const roll = document.getElementById("rollPercent").value;

  const res = await fetch(`${API}/students/percentage/${roll}`);
  const data = await res.json();

  document.getElementById("result").innerText =
    "Attendance: " + data.percentage + "%";
}
