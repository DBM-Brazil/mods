function iniciarautosave() {
  let customizesalvar = document.getElementById("customizesalvar");
  if (customizesalvar.value == 0) {
    autosavec = setInterval(saveatukak, 15000);
    document.querySelector("[name='saveatual']").innerText = 'Nunca';
  }
  if (customizesalvar.value == 1) {
    autosavec = setInterval(saveProject, 30000);
    document.querySelector("[name='saveatual']").innerText = 'A cada 30 segundos';
  } 
  if (customizesalvar.value == 2) {
    autosavec = setInterval(saveProject, 60000);
    document.querySelector("[name='saveatual']").innerText = 'A cada 1 minuto';
  } 
  if (customizesalvar.value == 3) {
    autosavec = setInterval(saveProject, 120000);
    document.querySelector("[name='saveatual']").innerText = 'A cada 2 minutos';
  }
  if (customizesalvar.value == 4) {
    autosavec = setInterval(saveProject, 300000);
    document.querySelector("[name='saveatual']").innerText = 'A cada 5 minutos';
  }
  if (customizesalvar.value == 5) {
    autosavec = setInterval(saveProject, 600000);
    document.querySelector("[name='saveatual']").innerText = 'A cada 10 minutos';
  }
  if (customizesalvar.value == 6) {
    autosavec = setInterval(saveProject, 900000);
    document.querySelector("[name='saveatual']").innerText = 'A cada 15 minutos';
  }
  if (customizesalvar.value == 7) {
    autosavec = setInterval(saveProject, 1800000);
    document.querySelector("[name='saveatual']").innerText = 'A cada 30 minutos';
  }
  if (customizesalvar.value == 8) {
    autosavec = setInterval(saveProject, 2700000);
    document.querySelector("[name='saveatual']").innerText = 'A cada 45 minutos';
  }
  if (customizesalvar.value == 9) {
    autosavec = setInterval(saveProject, 3600000);
    document.querySelector("[name='saveatual']").innerText = 'A cada 60 minutos';
  }
  if (customizesalvar.value == 10) {
    autosavec = setInterval(saveatukak2, 15000);
    document.querySelector("[name='saveatual']").innerText = 'Quando criar ou editar uma action';
  }
}

function saveatukak() {
  document.querySelector("[name='saveatual']").innerText = 'Nunca';
}
function saveatukak2() {
  document.querySelector("[name='saveatual']").innerText = 'Quando criar ou editar uma action';
}

function autosaveupaction() {
  let customizesalvar = document.getElementById("customizesalvar");
  if (customizesalvar.value == 10) {
    saveProject();
  }
}



