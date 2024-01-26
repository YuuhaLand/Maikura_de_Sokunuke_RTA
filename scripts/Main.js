import { world } from "@minecraft/server";

// 記録するための変数を準備しておく
let sokunuke = {}


//プレイヤーが参加したとき
world.afterEvents.playerJoin.subscribe(data => {
  // はじめ

  // 参加したときの時間を記録しておく
  sokunuke[data.playerName] = new Date().getTime() + 9 * 60 * 60 * 1000
  
  // おわり
})


//プレイヤーが抜けたとき
world.afterEvents.playerLeave.subscribe(data => {
  // はじめ

  // 記録になかったら処理しない
  if (!sokunuke[data.playerName]) return
  // 参加したときの時間を記録から取り出す
  let joined = sokunuke[data.playerName]
  // 抜けたときの時間 (現在時刻)を取得
  let left = new Date().getTime() + 9 * 60 * 60 * 1000
  // 抜けたときの時間‐参加したときの時間＝参加時間
  let jointime = left - joined

  // もし参加時間が1分未満だったら
  if (jointime < 60000){
    // 秒に計算
    let sec = Math.floor(jointime / 1000)
    // ミリ秒に計算
    let milli = jointime % 1000
    //メッセージをチャットに表示
    world.sendMessage(`§e${data.playerName} が即抜け! 即抜けRTA: ${sec}.${milli}秒!`)
  }

  // 抜けた人のデータはもう要らないので削除
  delete sokunuke[data.playerName]

  // おわり
})
