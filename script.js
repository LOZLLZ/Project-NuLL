let studentData = [];

// Load CSV file and parse data
async function loadCSV() {
  const response = await fetch('data.csv');
  const text = await response.text();
  const rows = text.trim().split('\n').slice(1); // Remove header

  studentData = rows.map(row => {
    const [LRN, Name, Grade, Assessment, Numeracy, SchoolYear] = row.split(',');
    return { LRN, Name, Grade, Assessment, Numeracy, SchoolYear };
  });
}

// Handle LRN submission
function submitLRN() {
  const input = document.getElementById('lrnInput');
  const lrn = input.value.trim();

  if (!/^\d{12}$/.test(lrn)) {
    alert('Please enter a valid 12-digit LRN.');
    return;
  }

  localStorage.setItem('studentLRN', lrn);
  window.location.href = 'student.html';
}

// Handle student info form
function submitStudentInfo() {
  const year = document.getElementById('schoolYear').value;
  const grade = document.getElementById('gradeLevel').value;
  const period = document.getElementById('assessmentType').value;

  if (!year || !grade || !period) {
    alert('Please fill out all fields.');
    return;
  }

  localStorage.setItem('selectedYear', year);
  localStorage.setItem('selectedGrade', grade);
  localStorage.setItem('selectedPeriod', period);

  window.location.href = 'results.html';
}
