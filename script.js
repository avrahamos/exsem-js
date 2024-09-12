const addSoldierForm = document.getElementById("addSoldierForm");
const fullNameInput = document.getElementById("fullName");
const rankInput = document.getElementById("rank");
const roleInput = document.getElementById("role");
const platoonInput = document.getElementById("platoon");
const missionTimeInput = document.getElementById("missionTime");
const statusInput = document.getElementById("status");
const soldiersTableBody = document.querySelector("#soldiersTable tbody");
const sortButton = document.getElementById("sortButton");
const editSection = document.getElementById("editSection");
const editSoldierForm = document.getElementById("editSoldierForm");
const editFullName = document.getElementById("editFullName");
const editRank = document.getElementById("editRank");
const editRole = document.getElementById("editRole");
const editPlatoon = document.getElementById("editPlatoon");
const editStatus = document.getElementById("editStatus");
const editMissionTime = document.getElementById("editMissionTime");
const cancelEditButton = document.getElementById("cancelEdit");

let soldiers = JSON.parse(localStorage.getItem("soldiers")) || [];
let ascending = true;
let editingSoldierIndex = null;

const createCell = (textContent) => {
  const cell = document.createElement("td");
  cell.textContent = textContent;
  return cell;
};

const createButton = (textContent, Click) => {
  const button = document.createElement("button");
  button.textContent = textContent;
  button.addEventListener("click", Click);
  return button;
};

const editSoldier = (index) => {
  const soldier = soldiers[index];
  editFullName.value = soldier.fullName;
  editRank.value = soldier.rank;
  editRole.value = soldier.role;
  editPlatoon.value = soldier.platoon;
  editStatus.value = soldier.status;
  editMissionTime.value = soldier.missionTime;
  editingSoldierIndex = index;

  editSection.style.display = "block";
};

const renderSoldiers = () => {
  soldiersTableBody.innerHTML = "";

  soldiers.forEach((soldier, index) => {
    const row = document.createElement("tr");

    row.appendChild(createCell(soldier.fullName));
    row.appendChild(createCell(soldier.rank));
    row.appendChild(createCell(soldier.role));
    row.appendChild(createCell(soldier.platoon));
    row.appendChild(createCell(soldier.status));
    row.appendChild(createCell(soldier.missionTime));

    const actionsCell = document.createElement("td");
    actionsCell.appendChild(createButton("Edit", () => editSoldier(index)));
    actionsCell.appendChild(createButton("Delete", () => deleteSoldier(index)));
    actionsCell.id = "actions";
    if (soldier.status !== "Retired") {
      actionsCell.appendChild(
        createButton("Mission", () => startMission(index))
      );
    }

    row.appendChild(actionsCell);
    soldiersTableBody.appendChild(row);
  });

  localStorage.setItem("soldiers", JSON.stringify(soldiers));
};

const addSoldier = () => {
  const newSoldier = {
    fullName: fullNameInput.value,
    rank: rankInput.value,
    role: roleInput.value,
    platoon: platoonInput.value,
    missionTime: missionTimeInput.value,
    status: statusInput.value,
  };

  soldiers.push(newSoldier);
  renderSoldiers();
  clearForm();
};

const clearForm = () => {
  fullNameInput.value = "";
  rankInput.value = "";
  roleInput.value = "";
  platoonInput.value = "";
  missionTimeInput.value = "";
  statusInput.value = "Active";
};

const deleteSoldier = (index) => {
  soldiers.splice(index, 1);
  renderSoldiers();
};

const updateSoldier = () => {
  const updatedSoldier = {
    fullName: editFullName.value,
    rank: editRank.value,
    role: editRole.value,
    platoon: editPlatoon.value,
    missionTime: editMissionTime.value,
    status: editStatus.value,
  };

  soldiers[editingSoldierIndex] = updatedSoldier;
  editingSoldierIndex = null;
  renderSoldiers();

  editSection.style.display = "none";
};

const cancelEdit = () => {
  editSection.style.display = "none";
};

const sortSoldiers = () => {
  soldiers.sort((a, b) => {
    if (ascending) {
      return a.fullName.localeCompare(b.fullName);
    } else {
      return b.fullName.localeCompare(a.fullName);
    }
  });

  ascending = !ascending;
  sortButton.textContent = `Full name ${ascending ? "⬆️" : "⬇️"}`;
  renderSoldiers();
};

addSoldierForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addSoldier();
});

editSoldierForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateSoldier();
});

cancelEditButton.addEventListener("click", cancelEdit);

sortButton.addEventListener("click", (e) => {
  e.preventDefault();
  sortSoldiers();
});

const startMission = (index) => {
  const soldier = soldiers[index];
  let timeRemaining = soldier.missionTime * 60;

  const countdown = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    soldiersTableBody.rows[index].cells[5].textContent = `${minutes}:  
    ${seconds}`;
    timeRemaining--;
  }, 1000);
};
renderSoldiers();
