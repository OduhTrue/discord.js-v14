const fs = require("fs")

module.exports = async (client) => {

const SlashsArray = []

  fs.readdir(`./cmds`, (error, folder) => {
  folder.forEach(subfolder => {
fs.readdir(`./cmds/${subfolder}/`, (error, files) => { 
  files.forEach(files => {
      
  if(!files?.endsWith('.js')) return;
  files = require(`../cmds/${subfolder}/${files}`);
  if(!files?.name) return;
  client.slashCommands.set(files?.name, files);
   
  SlashsArray.push(files)
  });
    });
  });
});
  client.on("ready", async () => {
  client.application.commands.set(SlashsArray)
    });
};