module.exports = {

  name: "Check Variable",
  section: "Conditions",
  meta: {
    version: '2.1.3',
    preciseCheck: false,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  fields: ["storage", "varName", "comparison", "value", "branch"],


  html(isEvent, data) {
    return `
<retrieve-from-variable allowSlashParams dropdownLabel="Variavel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br>

<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Tipo de comparação</span><br>
		<select id="comparison" class="round" onchange="glob.onComparisonChanged(this)">
			<option value="0">Existe</option>
			<option value="1" selected>Igual a</option>
			<option value="2">Exatamente igual</option>
			<option value="3">Menor que</option>
      <option value="13">Menor ou igual a</option>
			<option value="4">Maior que</option>
      <option value="12">Maior ou igual a</option>
			<option value="5">Inclui</option>
			<option value="6">Matches Regex</option>
      <option value="7">O comprimento é maior que</option>
			<option value="8">O comprimento é menor que</option>
			<option value="9">O comprimento e igual a</option>
			<option value="10">Começa com</option>
			<option value="11">Termina com</option>
		</select>
	</div>
	<div style="float: right; width: 60%;" id="directValue">
		<span class="dbminputlabel">Valor para comparar</span><br>
		<input id="value" class="round" type="text" name="is-eval">
	</div>
</div>

<br><br><br><br>

<hr class="subtlebar">

<br>

<conditional-input id="branch" style="padding-top: 8px;"></conditional-input>`;
  },


  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },



  init() {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      if (event.value === "0") {
        document.getElementById("directValue").style.display = "none";
      } else {
        document.getElementById("directValue").style.display = null;
      }
    };

    glob.onComparisonChanged(document.getElementById("comparison"));
  },



  action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const variable = this.getVariable(type, varName, cache);
    let result = false;

    const val1 = variable;
    const compare = parseInt(data.comparison, 10);
    let val2 = data.value;
    if (compare !== 6) val2 = this.evalIfPossible(val2, cache);
    switch (compare) {
      case 0:
        result = val1 !== undefined;
        break;
      case 1:
        result = val1 == val2;
        break;
      case 2:
        result = val1 === val2;
        break;
      case 3:
        result = val1 < val2;
        break;
      case 4:
        result = val1 > val2;
        break;
      case 5:
        if (typeof val1?.toString().includes === "function") {
          result = val1.toString().includes(val2);
        }
        break;
        case 6:
          result = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
          break;
        case 7:
          result = Boolean(val1.toString().length > val2);
          break;
        case 8:
          result = Boolean(val1.toString().length < val2);
          break;
        case 9:
          result = Boolean(val1.toString().length == val2);
          break;
        case 10:
          result = val1.toString().startsWith(val2);
          break;
        case 11:
          result = val1.toString().endsWith(val2);
          break;
          case 12:
          result = Boolean(val1 >= val2);
          break;
          case 13:
          result = Boolean(val1 <= val2);
          break;
    }

    this.executeResults(result, data?.branch ?? data, cache);
  },



  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },


  mod() {},
};
