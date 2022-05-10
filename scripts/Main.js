import { world } from "mojang-minecraft";

let sokunuke = new Object();

world.events.playerJoin.subscribe(joins => {
  sokunuke[joins.player.name] = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
})

world.events.playerLeave.subscribe(joins => {
  const playern = joins.playerName
  let dt1 = new Date(sokunuke[joins.playerName]);
  let dt2 = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
  let diffTime = dt2.getTime() - dt1.getTime();
  let dtim = new Date(diffTime);
  if (dtim.getMinutes() == 0) {
    const datas = {rawtext:[{text: `§l§c《§e即抜け§c》 §r§e${playern}§r§e が即抜けをしたみたいです。 即抜けRTA: ${dtim.getSeconds()}.${dtim.getMilliseconds()}秒!`}]}
    world.getDimension("overworld").runCommand(`tellraw @a ${JSON.stringify(datas)}`)
  }
})
