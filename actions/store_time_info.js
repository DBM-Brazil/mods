module.exports = {
  name: "Store Time Info",
  section: "Other Stuff",
  meta: {
    version: '2.1.3',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },
  

  subtitle(data, presets) {
    const time = ["Ano", "Mês", "Dia do Mês", "Hora", "Minuto", "Segundo", "Milisegundo", "Mês Texto", "Data", "Dia da semana", "Data(Por extenso)"];
    return `${time[parseInt(data.type, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let result = "Number";
    if (data.type === "7" || data.type === "9" || data.type === "10") {
      result = "String";
    }
    if (data.type === "8") {
      result = "Date";
    }
    return [data.varName, result];
  },

  fields: ["timezone", "type", "storage", "varName"],

  html(isEvent, data) {
    return `
<div>
  <div style="float: left; width: 70%">
	  <span class="dbminputlabel">Timezone</span><a style="margin-left: 5px;" href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">Timezones</a><br>
	  <input id="timezone" class="round" type="text" value="America/Sao_Paulo" placeholder="America/Sao_Paulo">
  </div> 
  <br><br><br>
	<div style="padding-top: 8px; width: 70%;">
		<span class="dbminputlabel">Time Info</span><br>
		<select id="type" class="round">
      <option value="8" selected>Data</option>
      <option value="10">Data(Por extenso)</option>
			<option value="0">Ano</option>
			<option value="1">Mês (Número)</option>
			<option value="7">Mês (Texto)</option>
			<option value="2">Dia do mês</option>
      <option value="9">Dia da semana</option>
			<option value="3">Hora</option>
			<option value="4">Minuto</option>
			<option value="5">Segundo</option>
			<option value="6">Milisegundo</option>
		</select>
	</div>
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em:" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>`;
  },

  init() {},

  action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.type, 10);
    const moment = require('moment-timezone');
    const timezone = this.evalMessage(data.timezone, cache);
    let result;
    switch (type) {
      case 0:
        result = moment(new Date()).tz(timezone).format("YYYY");
        break;
      case 1:
        result = moment(new Date()).tz(timezone).format("MM");
        break;
      case 2:
        result = moment(new Date()).tz(timezone).format("DD");
        break;
      case 3:
        result = moment(new Date()).tz(timezone).format("HH");
        break;
      case 4:
        result = moment(new Date()).tz(timezone).format("mm");
        break;
      case 5:
        result = moment(new Date()).tz(timezone).format("ss");
        break;
      case 6:
        result = moment(new Date()).tz(timezone).millisecond();
        break;
      case 7:
        result = moment(new Date()).tz(timezone).month();
        switch(result) {
              case 0:
                result = "Janeiro";
                break;
              case 1:
                result = "Fevereiro";
                break;
              case 2:
                result = "Março";
                break;
              case 3:
                result = "Abril";
                break;
              case 4:
                result = "Maio";
                break;
              case 5:
                result = "Junho";
                break;
              case 6:
                result = "Julho";
                break;
              case 7:
                result = "Agosto";
                break;
              case 8:
                result = "Setembro";
                break;
              case 9:
                result = "Outubro";
                break;
              case 10:
                result = "Novembro";
                break;
              case 11:
                result = "Dezembro";
                break;
        }
        break;
      case 8:
        result = moment(new Date()).tz(timezone).format("DD/MM/YYYY HH:mm:ss");
        break;
      case 9:
        result = moment(new Date()).tz(timezone).day();
        switch(result) {
              case 0:
                result = "Domingo";
                break;
              case 1:
                result = "Segunda-feira";
                break;
              case 2:
                result = "Terça-feira";
                break
              case 3:
                result = "Quarta-feira";
                break;
              case 4:
                result = "Quinta-feira"
                break;
              case 5:
                result = "Sexta-feira";
                break;
              case 6:
                result = "Sábado";
                break;
        }
      case 10:
        let data = new Date();
        let dia = moment(data).tz(timezone).day();
        let mes = moment(data).tz(timezone).month();
        let diaMes = moment(data).tz(timezone).format("DD");
        let hora = moment(data).tz(timezone).format("HH:mm:ss");
        switch(dia) {
          case 0:
            dia = "Domingo";
            break;
          case 1:
            dia = "Segunda-feira";
            break;
          case 2:
            dia = "Terça-feira";
            break
          case 3:
            dia = "Quarta-feira";
            break;
          case 4:
            dia = "Quinta-feira"
            break;
          case 5:
            dia = "Sexta-feira";
            break;
          case 6:
            dia = "Sábado";
            break;
        }

        switch(mes) {
          case 0:
            mes = "janeiro";
            break;
          case 1:
            mes = "fevereiro";
            break;
          case 2:
            mes = "março";
            break;
          case 3:
            mes = "abril";
            break;
          case 4:
            mes = "maio";
            break;
          case 5:
            mes = "junho";
            break;
          case 6:
            mes = "julho";
            break;
          case 7:
            mes = "agosto";
            break;
          case 8:
            mes = "setembro";
            break;
          case 9:
            mes = "outubro";
            break;
          case 10:
            mes = "novembro";
            break;
          case 11:
            mes = "dezembro";
            break;
        }

        result = dia + ", " + diaMes + " de " + mes + ", " + hora;
      default:
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
