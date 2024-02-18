const canvas = document.getElementById('canvas');
const spinSound = new Audio('spin-sound.mp3');
spinSound.loop = true; // Habilita la repetición del sonido
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const submitButton = document.getElementById('submitButton');
const studentInput = document.getElementById('studentInput');

let numEstudiantes = 0;
let estudiantes = [];

const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];


function drawSegment(segment, index) {
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
    for (let i = 0; i < numEstudiantes; i++) {
        drawSegment(estudiantes[i], i);
        drawText(estudiantes[i], i);
    }
}

function rotateWheel() {
    const angle = (2 * Math.PI) / numEstudiantes;
    ctx.translate(400, 400);
    ctx.rotate(angle);
    ctx.translate(-400, -400);
}
function drawText(segment, index) {
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
    const duration = 4000;
    const steps = 200;
    const stepDuration = duration / steps;
    const rotations = 10;
    const selectedStudentElement = document.getElementById("selectedStudent");

    let currentStep = 0;
    spinButton.disabled = true;

    // Reproduce el sonido
    spinSound.play();

    function animate() {
        if (currentStep < steps) {
            rotateWheel();
            drawSegments();
            currentStep++;
            setTimeout(animate, stepDuration);
        } else {
            spinButton.disabled = false;
            const selected = Math.floor(Math.random() * numEstudiantes);
            selectedStudentElement.innerText = `Estudiante seleccionado: ${estudiantes[selected]}`;

            // Detiene el sonido
            spinSound.pause();
            spinSound.currentTime = 0; // Establece el tiempo del sonido a 0 para reproducir desde el principio la próxima vez
        }
    }

    animate();
}


drawSegments();
spinButton.addEventListener('click', spinWheel);

submitButton.addEventListener('click', function() {
    estudiantes = studentInput.value.split('\n').filter(Boolean);
    numEstudiantes = estudiantes.length;
    drawSegments();
});

spinButton.addEventListener('click', function() {
    if (estudiantes.length > 0) {
        spinWheel();
    } else {
        alert('Por favor, ingresa al menos un estudiante.');
    }
});