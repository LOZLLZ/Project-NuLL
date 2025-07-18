let studentData = [];

async function loadCSV() {
  const response = await fetch('data.csv');
  const data = await response.text();
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');

  studentData = lines.slice(1).map(line => {
    const values = line.split(',');
    const row = {};
    headers.forEach((header, index) => {
      row[header.trim()] = values[index].trim();
    });
    return row;
  });
}

// Save LRN from lrn.html
function saveLRN() {
  const lrnInput = document.getElementById("lrnInput").value.trim();
  localStorage.setItem("studentLRN", lrnInput);

  const student = studentData.find(s => s.LRN === lrnInput);
  if (student) {
    localStorage.setItem("studentName", student.Name);
  } else {
    alert("LRN not found.");
    return;
  }

  window.location.href = "student.html";
}

// Save selection from student.html
function submitStudentForm() {
  const schoolYear = document.getElementById("schoolYear").value;
  const grade = document.getElementById("gradeLevel").value;
  const period = document.getElementById("assessmentType").value;

  if (!schoolYear || !grade || !period) {
    alert("Please fill out all fields.");
    return;
  }

  localStorage.setItem("selectedYear", schoolYear);
  localStorage.setItem("selectedGrade", grade);
  localStorage.setItem("selectedPeriod", period);

  window.location.href = "results.html";
}
