module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Timeout Member",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Member Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `${presets.getMemberText(data.member, data.varName)}`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["opcao", "member", "varName", "tempo", "time", "reason"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
    <member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

    <br><br><br><br>

    <div style="width: 30%;">
      <span class="dbminputlabel">Opção</span>
      <select id="opcao" class="round" onchange="glob.change(this)">
        <option value="0" selected>Setar castigo</option>
        <option value="1">Remover castigo</option>
      </select>
    </div>

    <br>
    
    <div id="campo1" style="float: left; width: 45%;">
      <span class="dbminputlabel">Tempo</span><br>
      <select id="tempo" class="round">
        <option value="0" selected>Segundos</option>
        <option value="1">Minutos</option>
        <option value="2">Horas</option>
        <option value="3">Dias</option>
      </select>
    </div>
    <div id="campo2" style="float: right; width: 50%;">
      <span class="dbminputlabel">Quantidade</span><br>
      <input id="time" class="round" type="text">
    </div>

    <div id="campo3">
      <br><br><br>
    </div>
    
    <div style="padding-top: 16px;">
      <span class="dbminputlabel">Razão</span><br>
      <textarea id="reason" class="dbm_monospace" rows="5" placeholder="Insira a razão aqui..." style="white-space: nowrap; resize: none;"></textarea>
    </div>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {
    glob.change = function(event) {
      if(event.value === "0") {
        document.getElementById("campo1").style.display = "block";
        document.getElementById("campo2").style.display = "block";
        document.getElementById("campo3").style.display = "block";
      } else {
        document.getElementById("campo1").style.display = "none";
        document.getElementById("campo2").style.display = "none";
        document.getElementById("campo3").style.display = "none";
      }
    }

    glob.change(document.getElementById("opcao"));
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(data.member, data.varName, cache);
    const tempo = parseInt(data.tempo, 10);

    let time = this.evalMessage(data.time, cache);
    if(data.opcao === "0") {
      switch (tempo) {
        case 0: 
        time = time ? Date.now() + time * 1000 : null;
        break;
        case 1: 
        time = time ? Date.now() + time * 60000 : null;
        break;
        case 2:
        time = time ? Date.now() + time * 3600000 : null;
        break;
        case 3:
        time = time ? Date.now() + time * 86400000 : null;
        break;
        default:
        break;
      }
    } else {
      time = time ? Date.now() + 0 : null;
    }
    const reason = this.evalMessage(data.reason, cache);

    if (Array.isArray(member)) {
      this.callListFunc(member, "disableCommunicationUntil", [time, reason])
        .then(() => this.callNextAction(cache))
        .catch((err) => this.displayError(data, cache, err));
    } else if (member?.disableCommunicationUntil) {
      member.disableCommunicationUntil(time, reason)
        .then(() => this.callNextAction(cache))
        .catch((err) => this.displayError(data, cache, err));
    } else {
      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() {},
};
