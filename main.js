document.addEventListener("DOMContentLoaded", () => {
  const regionSelector = document.getElementById("region");
  const departementSelector = document.getElementById("departement");
  const communesListe = document.getElementById("communes");
  const communeBnt = document.querySelector("button");

  fetch("https://geo.api.gouv.fr/regions")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((region) => {
        const option = document.createElement("option");
        option.value = region.code;
        option.textContent = region.nom;
        regionSelector.appendChild(option);
      });
    });

  const departements = (codeRegion) => {
    fetch(`https://geo.api.gouv.fr/regions/${codeRegion}/departements`)
      .then((response) => response.json())
      .then((data) => {
        departementSelector.innerHTML = "";
        data.forEach((departement) => {
          const option = document.createElement("option");
          option.textContent = departement.nom;
          option.value = departement.code;
          departementSelector.appendChild(option);
        });
      });
  };

  regionSelector.addEventListener("change", function () {
    const codeRegion = this.value;
    departements(codeRegion);
  });

  communeBnt.addEventListener("click", () => {
    const codeDepartement = departementSelector.value;
    fetch(`https://geo.api.gouv.fr/departements/${codeDepartement}/communes`)
      .then((response) => response.json())
      .then((data) => {
        communesListe.innerHTML = "";
        data.forEach((commune) => {
          const li = document.createElement("li");
          li.textContent = commune.nom;
          communesListe.appendChild(li);
        });
      });
  });
});
