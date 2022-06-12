module.exports = {
  name: "Store Message Info",
  section: "Messaging",
  meta: {
    version: '2.1.4',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data, presets) {
    const info = [
      "Objeto da mensagem",
      "ID da mensagem",
      "Texto da mensagem",
      "Autor da Mensagem",
      "Canal da mensagem",
      "Timestamp da mensagem",
      "A mensagem está fixada?",
      "A mensagem é TTS?",
      "Lista de anexos da mensagem",
      "Edições da mensagem",
      "ID do servidor da mensagem",
      "",
      "Contagem de Reações da Mensagem",
      "Lista de usuários mencionados",
      "Contagem de usuários mencionados",
      "URL da mensagem",
      "Data de criação da mensagem",
      "Comprimento do conteúdo da mensagem",
      "Contagem de anexos da mensagem",
      "Servidor da mensagem",
      "Tipo de mensagem",
      "ID do webhook da mensagem",
      "Objeto da Embed da Mensagem",
      "Titulo da embed",
      "Descrição da embed",
      "Url da embed",
      "Cor da embed",
      "Timestamp da embed",
      "Thumbnail da embed",
      "Imagem da embed",
      "Nome do  autor na embed",
      "Icone URL do autor na embed",
      "URL do autor na embed",
      "Footer texto da embed",
      "Footer Icon URL da embed",
      "Nome do Field da embed",
      "Valor do Field da embed",
      "Inline do Field da embed",
    ];
    return `${presets.getMessageText(data.message, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Message";
        break;
      case 1:
        dataType = "Message ID";
        break;
      case 2:
        dataType = "Text";
        break;
      case 3:
        dataType = "Server Member";
        break;
      case 4:
        dataType = "Channel";
        break;
      case 5:
        dataType = "Text";
        break;
      case 6:
      case 7:
        dataType = "Boolean";
        break;
      case 8:
        dataType = "Date";
      case 9:
        dataType = "Messages List";
      case 12:
        dataType = "Number";
        break;
      case 13:
        dataType = "Array";
        break;
      case 14:
        dataType = "Number";
        break;
      case 15:
        dataType = "URL";
        break;
      case 16:
        dataType = "Date";
        break;
      case 17:
      case 18:
        dataType = "Number";
        break;
      case 19:
        dataType = "Guild";
        break;
      case 20:
        dataType = "Message Type";
        break;
      case 21:
        dataType = "Webhook ID";
        break;
      case 22:
        dataType = "Embed Message";
        break;
        case 23:
          dataType = "Embed Message";
          break;
          case 24:
            dataType = "Embed Message";
            break;
            case 25:
              dataType = "Embed Message";
              break;
              case 26:
                dataType = "Embed Message";
                break;
                case 27:
                  dataType = "Embed Message";
                  break;
                  case 28:
                    dataType = "Embed Message";
                    break;
                    case 29:
                      dataType = "Embed Message";
                      break;
                      case 30:
                        dataType = "Embed Message";
                        break;
                        case 31:
                          dataType = "Embed Message";
                          break;
                          case 32:
                            dataType = "Embed Message";
                            break;
                            case 33:
                              dataType = "Embed Message";
                              break;
                              case 34:
                                dataType = "Embed Message";
                                break;
                                case 35:
                                  dataType = "Embed Message";
                                  break;
                                  case 36:
                                    dataType = "Embed Message";
                                    break;
                                    case 37:
                                      dataType = "Embed Message";
                                      break;
    }
    return [data.varName2, dataType];
  },

  fields: ["message", "varName", "info", "embednumero", "field", "storage", "varName2"],


  html(isEvent, data) {
    return `
<message-input dropdownLabel="Mensagem" selectId="message" variableContainerId="varNameContainer" variableInputId="varName"></message-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Informação</span><br>
	<select id="info" class="round" onchange="glob.onComparisonChanged(this)">
		<option value="0" selected>Objeto da mensagem</option>
		<option value="1">ID da mensagem</option>
		<option value="2">Texto da mensagem</option>
		<option value="3">Autor da mensagem</option>
		<option value="4">Canal da mensagem</option>
		<option value="5">Timestamp da mensagem</option>
		<option value="6">A mensagem está fixada?</option>
    <option value="7">A mensagem é TTS?</option>
    <option value="8">Lista de anexos da mensagem</option>
		<option value="9">Edições da mensagem</option>
		<option value="12">Contagem de reações de mensagens</option>
		<option value="13">Lista de usuários mencionados na mensagem</option>
		<option value="14">Contagem de usuários mencionados na mensagem</option>
		<option value="15">URL da mensagem</option>
		<option value="16">Data de criação da mensagem</option>
		<option value="17">Comprimento do conteúdo da mensagem</option>
		<option value="18">Contagem de anexos da mensagem</option>
		<option value="10">ID do servidor da mensagem</option>
    <option value="19">Servidor da mensagem</option>
		<option value="20">Tipo de mensagem</option>
		<option value="21">ID do webhook da mensagem</option>
		<option value="22">Objeto Embed da mensagem</option>
    <optgroup label="Informações da Embed">
    <option value="23">Titulo da embed</options>
    <option value="24">Descrição da embed</options>
    <option value="25">Url da embed</options>
    <option value="26">Cor da embed</options>
    <option value="27">Timestamp da embed</options>
    <option value="28">Thumbnail da embed</options>
    <option value="29">Imagem da embed</options>
    <option value="30">Nome do  autor na embed</options>
    <option value="31">Icone URL do autor na embed</options>
    <option value="32">URL do autor na embed</options>
    <option value="33">Footer texto da embed</options>
    <option value="34">Footer Icon URL da embed</options>
    <option value="35">Nome do Field da embed</options>
    <option value="36">Valor do Field da embed</options>
    <option value="37">Inline do Field da embed</options>
    </optgroup>
	</select>
</div><br>
<table style="width:100%"><tr><td style="padding:5px">
<div style="width: 100%;display:none" id="containerxin2">
<span class="dbminputlabel">Número da Embed</span><br>
<input id="embednumero" value="0" class="round" type="text">
<br>
</div></td><td style="padding:5px">
<div style="width: 100%;" id="containerxin">
<span class="dbminputlabel">Número da Field</span><br>
<input id="field" value="0" class="round" type="text">
<br>
</div></td></tr></table>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },


  init() {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      if (event.value > 21) {
        document.getElementById("containerxin2").style.display = "block";
      }
      if (event.value < 22) {
        document.getElementById("containerxin2").style.display = "none";
      }
      if (event.value < 35) {
        document.getElementById("containerxin").style.display = "none";
      } else {
        document.getElementById("containerxin").style.display = "block";
      }
    };

    glob.onComparisonChanged(document.getElementById("info"));



  },

  async action(cache) {
    const data = cache.actions[cache.index];
    let field = this.evalMessage(data.field, cache);
    let embednumero = this.evalMessage(data.embednumero, cache);
    const msg = await this.getMessageFromData(data.message, data.varName, cache);

    if (!msg) {
      this.callNextAction(cache);
      return;
    }

    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = msg;
        break;
      case 1:
        result = msg.id;
        break;
      case 2:
        result = msg.content;
        break;
      case 3:
        result = msg.member ?? msg.author;
        break;
      case 4:
        result = msg.channel;
        break;
      case 5:
        result = msg.createdTimestamp;
        break;
      case 6:
        result = msg.pinned;
        break;
      case 7:
        result = msg.tts;
        break;
      case 8:
        result = [...msg.attachments.values()];
        break;
      case 9:
        result = msg.edits;
        break;
      case 10:
          result = msg.guild.id;
          break;
      case 12:
        result = msg.reactions.cache.size;
        break;
      case 13:
        result = [...msg.mentions.users.values()];
        break;
      case 14:
        result = msg.mentions.users.size;
        break;
      case 15:
        result = msg.url;
        break;
      case 16:
        result = msg.createdAt;
        break;
      case 17:
        result = msg.content.length;
        break;
      case 18:
        result = msg.attachments.size;
        break;
      case 19:
        result = msg.guild;
        break;
      case 20:
        result = msg.type;
        break;
      case 21:
        result = msg.webhookId;
        break;
      case 22:
        result = msg.embeds[embednumero];
        break;
        case 23:
          result = msg.embeds[embednumero].title;
        break;
        case 24:
          result = msg.embeds[embednumero].description;
        break;
        case 25:
          result = msg.embeds[embednumero].url;
        break;
        case 26:
          result = msg.embeds[embednumero].color;
        break;
        case 27:
          result = msg.embeds[embednumero].timestamp;
        break;
        case 28:
          result = msg.embeds[embednumero].thumbnail.url;
        break;
        case 29:
          result = msg.embeds[embednumero].image.url;
        break;
        case 30:
          result = msg.embeds[embednumero].author.name;
        break;
        case 31:
          result = msg.embeds[embednumero].author.icon_url;
        break;
        case 32:
          result = msg.embeds[embednumero].author.url;
        break;
        case 33:
          result = msg.embeds[embednumero].footer.text;
        break;
        case 34:
          result = msg.embeds[embednumero].footer.icon_url;
        break;
        case 35:
          result = msg.embeds[embednumero].fields[field].name
        break;
        case 36:
          result = msg.embeds[embednumero].fields[field].value;
        break;
        case 37:
          result = msg.embeds[embednumero].fields[field].inline;
        break;
      default:
        break;
    } 
    
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
