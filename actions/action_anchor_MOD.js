module.exports = {
  name: 'Action Anchor',
  section: 'Other Stuff',
  meta: {
    version: '2.1.3',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },
  
  subtitle(data) {
    return data.description
      ? `<font color="${data.color}">Âncora: ${data.anchorName} | ${data.description}</font>`
      : `<font color="${data.color}">Âncora: ${data.anchorName}`},

  fields: ['anchorName', 'color', 'description'],

  html() {
    return `
<div style="float: left; width: 74%;">
<span class="dbminputlabel">Nome da âncora</span><br>
  <input type="text" class="round" id="anchorName"><br>
</div>
<div style="float: right; width: 24%;text-align:center">
<span class="dbminputlabel">Cor da descrição</span><br><input type="color" class="round" id="color">
</div>
<div>
  <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Descrição</span><br>
    <input type="text" class="round" id="description">
  </div>`;
  },

  init() {},

  action(cache) {
    this.callNextAction(cache);
  },

  modInit(data, customData, index) {
    if (!customData.anchors) {
      customData.anchors = {};
    }
    customData.anchors[data.anchorName] = index;
  },


  mod() {},
};
