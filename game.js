import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor() {
    this.hp = 100;
    this.minAtt = 20;
    this.maxAtt = 25;
  }

  attack() {
    return Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
  }
}

class Monster {
  constructor() {
    this.hp = 100;
    this.minAtt = 10;
    this.maxAtt = 15;
  }

  attack() {
    return Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
  }
}

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
    chalk.blueBright(
      `| 플레이어 정보`, `체력 :`,player.hp
    ) +
    chalk.redBright(
      `| 몬스터 정보 |`, `체력 : `,monster.hp
    ),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 최댓값도 포함, 최솟값도 포함
}


const battle = async (stage, player, monster) => {
  let logs = [];

  while(player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 공격한다 2. 도망치기.`,
      ),
    );
    const choice = readlineSync.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리
    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
    switch(choice){
      case '1': 
        const attP = player.attack();
        const attM = monster.attack();
        monster.hp -= attP;
        player.hp -= attM;
        logs.push(`몬스터에게 ${attP}데미지!`);
        logs.push(`플레이어에게 ${attM}데미지!`);
        break;
        
      case '2': 
        logs.push('도망쳤습니다.');

        break;

      default:
          logs.push(chalk.red('올바른 선택을 하세요.'));
          battle();
          break;
    }
  }
  
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    await battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건

    stage++;
  }
  if(stage >= 11) console.log('game over');

}