let studentData = [];

async function loadCSV() {
  if (studentData.length > 0) return; // Already loaded
  try {
    const response = await fetch('data.csv');
    const text = await response.text();
    const rows = text.trim().split('\n').map(r => r.split(','));

    const headers = rows[0];
    studentData = rows.slice(1).map(row => {
      let obj = {};
      row.forEach((val, idx) => {
        obj[headers[idx].trim()] = val.trim();
      });
      return obj;
    });
  } catch (error) {
    console.error('Error loading CSV:', error);
  }
}

// Used in student.html to display student name
async function showStudentName() {
  await loadCSV();
  const lrn = localStorage.getItem('studentLRN');
  const student = studentData.find(row => row.LRN === lrn);
  document.getElementById('studentName').textContent = student ? student.Name : "Not Found";
}

// Used in results.html to show numeracy level
async function displayResults() {
  await loadCSV();
  const lrn = localStorage.getItem('studentLRN');
  const grade = localStorage.getItem('selectedGrade');
  const period = localStorage.getItem('selectedPeriod');
  const year = localStorage.getItem('selectedYear');

  const match = studentData.find(row =>
    row.LRN === lrn &&
    row.Grade === grade &&
    row.Assessment === period &&
    row.SchoolYear === year
  );

  const resultsBox = document.getElementById('resultsBox');
  resultsBox.innerHTML = match
    ? `<h3>Numeracy Level: ${match.Numeracy}</h3>`
    : `<h3 style="color:red;">No data found for the given selection.</h3>`;
}
