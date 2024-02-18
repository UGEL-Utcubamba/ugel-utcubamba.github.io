const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const studentsInput = document.getElementById('studentsInput');
const submitButton = document.getElementById('submitButton');
const generateGroupsButton = document.getElementById('generateGroupsButton');
const numGroupsElement = document.getElementById('numGroups');
const groupsContainer = document.getElementById('groupsContainer');
let estudiantes = [];

const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
const spinSound = new Audio('spin-sound.mp3');
spinSound.loop = true; 

function updateStudents() {
    estudiantes = studentsInput.value.split('\n');
    drawSegments();
}

submitButton.addEventListener('click', updateStudents);

function drawSegment(segment, index, numEstudiantes) {
    const angle = (2 * Math.PI) / numEstudiantes;
    const startAngle = index * angle;
    const endAngle = (index + 1) * angle;

    ctx.beginPath();
    ctx.moveTo(400, 400);
    ctx.arc(400, 400, 350, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();
    ctx.stroke();
}

function drawSegments() {
    const numEstudiantes = estudiantes.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpia el canvas antes de dibujar los segmentos
    for (let i = 0; i < numEstudiantes; i++) {
        drawSegment(estudiantes[i], i, numEstudiantes);
        drawText(estudiantes[i], i, numEstudiantes);
    }
}

function rotateWheel() {
    const angle = (2 * Math.PI) / estudiantes.length;
    ctx.translate(400, 400);
    ctx.rotate(angle);
    ctx.translate(-400, -400);
}

function drawText(segment, index, numEstudiantes) {
    const angle = (2 * Math.PI) / numEstudiantes;
    const startAngle = index * angle;
    const endAngle = (index + 1) * angle;
    const middleAngle = (startAngle + endAngle) / 2;

    ctx.save();
    ctx.translate(400, 400);
    ctx.rotate(middleAngle);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(segment, 310, 0);
    ctx.restore();
}

function spinWheel() {
    const duration = 2000;
    const steps = 100;
    const stepDuration = duration / steps;
    const rotations = 10;
    const selectedStudentElement = document.getElementById("selectedStudent");

    let currentStep = 0;
    spinButton.disabled = true;
    spinSound.play();

    function animate() {
        if (currentStep < steps) {
            rotateWheel();
            drawSegments();
            currentStep++;
            setTimeout(animate, stepDuration);
        } else {
            spinButton.disabled = false;
            const selected = Math.floor(Math.random() * estudiantes.length);
            selectedStudentElement.innerText = `Estudiante seleccionado: ${estudiantes[selected]}`;

            spinSound.pause();
            spinSound.currentTime = 0; 
        }
    }

    animate();
}

function generateGroups() {
    const numGroups = numGroupsElement.value;
    const numStudents = estudiantes.length;
    const studentsPerGroup = Math.floor(numStudents / numGroups);

    groupsContainer.innerHTML = '';

    for (let i = 0; i < numGroups; i++) {
        const groupElement = document.createElement('div');
        groupElement.className = 'group';

        const groupHeader = document.createElement('h2');
        groupHeader.textContent = `Grupo ${i + 1}`;
        groupElement.appendChild(groupHeader);

        const groupList = document.createElement('ul');
        for (let j = 0; j < studentsPerGroup; j++) {
            const studentIndex = i * studentsPerGroup + j;
            if (studentIndex < numStudents) { 
                const studentElement = document.createElement('li');
                studentElement.textContent = estudiantes[studentIndex];
                groupList.appendChild(studentElement);
            }
        }

        groupElement.appendChild(groupList);
        groupsContainer.appendChild(groupElement);
    }

    const remainingStudents = numStudents % numGroups;
    for (let i = 0; i < remainingStudents; i++) {
        const studentElement = document.createElement('li');
        studentElement.textContent = estudiantes[numGroups * studentsPerGroup + i];
        groupsContainer.children[i].children[1].appendChild(studentElement); 
    }
}

generateGroupsButton.addEventListener('click', generateGroups);
spinButton.addEventListener('click', spinWheel);
