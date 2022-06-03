module.exports = {
  name: 'Store Date Info Plus',
  section: 'Other Stuff',
  meta: {
    version: '2.1.3',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data) {
    const info = [
      'Dia da semana',
      'Dia do mês',
      'Dia do ano',
      'Semana do ano',
      'Mês(Texto)',
      'Mês(Número)',
      'Ano',
      'Hora',
      'Minuto',
      'Segundo',
      'Milisegundo',
      'Timezone',
      'Unix Timestamp',
      'Data completa',
    ];
    const storage = ['', 'Temp Variable', 'Server Variable', 'Global Variable'];

    return `Armazenando ${
      data.modeStorage === '0' ? `"${info[data.info]}"` : data.buildInput === '' ? '"Não setada"' : `"${data.buildInput}"`
    } da data ~ ${storage[data.storage]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Date'];
  },

  fields: ['sourceDate', 'timezone', 'dateLanguage', 'modeStorage', 'info', 'buildInput', 'storage', 'varName'],

  html(_isEvent, data) {
    return `
<div style="float: left; width: 58%">
  Data de entrada:<br>
  <input id="sourceDate" class="round" type="text" placeholder="Ex: Sun Oct 26 2019 10:38:01 GMT+0200">
</div>
<div style="float: right; width: 40%">
  Idioma da data (iniciais):<br>
  <input id="dateLanguage" class="round" placeholder='O padrão é "pt-BR" (Português)'>
</div><br><br>
<div style="float: left; width: 58%">
    Timezone:(<span class="wrexlink" data-url="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">Timezones</span>)<br>
    <input id="timezone" class="round" type="text" placeholder="Ex: America/Sao_Paulo" value="America/Sao_Paulo">
</div><br><br><br>
<div style="float: left; width: 40%; padding-top: 16px">
  Modo:<br>
  <select id="modeStorage" class="round" onchange="glob.onChangeMode(this)">
    <option value="0" selected>Seletor</option>
    <option value="1">Construtor</option>
  </select>
</div>
<div id="selectMode" style="display: none; float: right; width: 50%; padding-top: 16px">
  Infos:<br>
  <select id="info" class="round">
    <option value="0" selected>Dia da semana</option>
    <option value="1">Dia do mês</option>
    <option value="2">Dia do ano</option>
    <option value="3">Semana do ano</option>
    <option value="5">Mês(Número)</option>
    <option value="4">Mês(Texto)</option>
    <option value="6">Ano</option>
    <option value="7">Hora</option>
    <option value="8">Minuto</option>
    <option value="9">Segundo</option>
    <option value="10">Milisegundo</option>
    <option value="11">Timezone</option>
    <option value="12">Unix Timestamp</option>
    <option value="13">Data completa</option>
  </select>
</div>
<div id="buildMode" style="display: none; float: right; width: 50%; padding-top: 16px">
  Construa aqui (<span class="wrexlink" data-url="https://momentjs.com/docs/#/displaying/format/">Moment Docs</span>):<br>
  <input id="buildInput" class="round" placeholder="Ex: DD/MM/YYYY = 26/10/2019">
</div><br><br><br><br>
<div style="float: left; width: 35%; padding-top: 10px">
  Armazenar em:<br>
  <select id="storage" class="round">
    ${data.variables[1]}
  </select>
</div>
<div id="varNameContainer" style="float: right; width: 60%; padding-top: 10px">
  Nome da variável:<br>
  <input id="varName" class="round" type="text">
</div><br><br><br>
<div id="noteContainer" style="display: none; padding-top: 16px">
  <b>Nota:</b> Você pode usar colchetes para colocar o texto no modo construtor no campo "Construa aqui".<br>
  <b>Ex:</b> <span id="code">DD/MM/YYYY [às] HH:mm</span> = <span id="code">26/10/2019 às 10:38</span>
</div>
<style>
  span.wrexlink {
    color: #99b3ff;
    text-decoration: underline;
    cursor: pointer
  }

  span.wrexlink:hover {
    color:#4676b9
  }

  #code {
    background: #2C313C;
    color: white;
    padding: 3px;
    font-size: 12px;
    border-radius: 2px
  }
</style>`;
  },

  init() {
    const { glob, document } = this;

    glob.onChangeMode = function onChangeMode(modeStorage) {
      switch (parseInt(modeStorage.value, 10)) {
        case 0:
          document.getElementById('selectMode').style.display = null;
          document.getElementById('buildMode').style.display = 'none';
          document.getElementById('noteContainer').style.display = 'none';
          break;
        case 1:
          document.getElementById('selectMode').style.display = 'none';
          document.getElementById('buildMode').style.display = null;
          document.getElementById('noteContainer').style.display = null;
          break;
      }
    };

    glob.onChangeMode(document.getElementById('modeStorage'));

    const wrexlinks = document.getElementsByClassName('wrexlink');
    for (let x = 0; x < wrexlinks.length; x++) {
      const wrexlink = wrexlinks[x];
      const url = wrexlink.getAttribute('data-url');
      if (url) {
        wrexlink.setAttribute('title', url);
        wrexlink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          console.log(`Launching URL: [${url}] in your default browser.`);
          require('child_process').execSync(`start ${url}`);
        });
      }
    }
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const moment = require('moment-timezone');
    const dateLanguage = this.evalMessage(data.dateLanguage, cache);
    const timezone = this.evalMessage(data.timezone, cache);
    const date = moment(
      Date.parse(this.evalMessage(data.sourceDate, cache)),
      '',
      dateLanguage === '' ? 'pt-BR' : dateLanguage,
    ).tz(timezone);
    const buildInput = this.evalMessage(data.buildInput, cache);
    const modeType = parseInt(this.evalMessage(data.modeStorage, cache), 10);
    const info = parseInt(data.info, 10);

    let result;

    if (modeType === 0) {
      switch (info) {
        case 0:
          result = date.format('dddd');
          break;
        case 1:
          result = date.format('DD');
          break;
        case 2:
          result = date.format('DDD');
          break;
        case 3:
          result = date.format('ww');
          break;
        case 4:
          result = date.format('MMMM');
          break;
        case 5:
          result = date.format('MM');
          break;
        case 6:
          result = date.format('YYYY');
          break;
        case 7:
          result = date.format('hh');
          break;
        case 8:
          result = date.format('mm');
          break;
        case 9:
          result = date.format('ss');
          break;
        case 10:
          result = date.format('SS');
          break;
        case 11:
          result = date.format('ZZ');
          break;
        case 12:
          result = date.format('X');
          break;
        case 13:
          result = date.format("DD/MM/YYYY HH:mm:ss");
        default:
          break;
      }
    } else {
      result = date.format(buildInput);
    }

    if (result === 'Invalid date') {
      return console.log(
        'Data inválida! Verifique se sua data é válida em "Store Date Info Plus". Uma Data geralmente se parece com a armazenada na "Data de Criação" de um servidor. (as variáveis ​​funcionam)',
      );
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
