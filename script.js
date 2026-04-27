function showProject(project) {
    alert("clicked" + project);
}

function showProject(project) {
  const detail = document.getElementById("project-detail");
  const title = document.getElementById("detail-title");
  const text = document.getElementById("detail-text");

  if (project === "p1") {
    title.innerText = "Attitude Control of a Pulsed Plasma Thruster Using Magnetic Nozzles";

    text.innerHTML = `
    <h4>Background</h4>
    <p>
    CubeSats are widely used in modern space missions. However, traditional propulsion systems have limitations.
    This research focuses on Pulsed Plasma Thrusters (PPT) combined with magnetic nozzles to improve thrust and enable attitude control.
    </p>

    <h4>Objective</h4>
    <p>
    This project aims to control the thrust vector by using three magnetic coils and adjusting the magnetic field shape.
    </p>

    <h4>Method</h4>
    <p>
    A two-axis thrust stand is developed to measure thrust direction. Simulations using a 3D hybrid particle model are also conducted.
    </p>

    <h4>Result / Goal</h4>
    <p>
    The goal is to establish a compact and reliable attitude control system without mechanical parts.
    </p>
    `;
  }

  if (project === "p2") {
    title.innerText = "AI Kimono Project";
    text.innerHTML = "Explain your AI kimono project here.";
  }

  if (project === "p3") {
    title.innerText = "Walking Battery";
    text.innerHTML = "Explain your walking battery project here.";
  }

  detail.style.display = "block";
}
