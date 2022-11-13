const MissionUtils = require("@woowacourse/mission-utils");
const {Console} = MissionUtils;

const Lotto = require("./Lotto.js");
const LottoTicket = require("./LottoTicket.js");
const BonusNumber = require("./BonusNumber.js");
const Money = require("./Money.js");

class App {
  lottocount;
  lottotickets;
  input_money;
  input_lotto;
  input_bonus;

  play(){
    this.inputMoney();
  }

  inputMoney(){
    Console.readLine('구입금액을 입력해 주세요.\n', (input) => {
      this.input_money = new Money(input);
      Console.print("");

      this.countLotto();
      this.publishLotto();
      this.printLotto();
      
      this.inputWinNumber();
    });
  }

  inputWinNumber(){
    Console.readLine('당첨 번호를 입력해 주세요.\n', (input) => {
      input = input.split(",");
      this.input_lotto = new Lotto(input);
    });  
  }

  inputBonusNumber(){
    Console.readLine('보너스 번호를 입력해 주세요.\n', (input) => {
      this.input_lotto = new BonusNumber(input, input_lotto);
      this.input_bonus = input;
    });
  }

  countLotto(){
    const money = this.input_money.getMoney();
    if(!(money % 1000 === 0))
      throw new Error("[ERROR] 1,000원 단위로 입력해 주세요.");
    this.lottocount = money / 1000;
  }

  publishLotto(){
    this.lottotickets = new Array();
    for(let i=0; i < this.lottocount; i++)
      this.lottotickets.push(new LottoTicket());
  }

  printLotto(){
    Console.print(this.lottocount + "개를 구매했습니다.");

    for(let i=0; i < this.lottocount; i++){
      let lottoticket = this.lottotickets[i];
      Console.print(lottoticket.getNumbers());
    }
  }
}

const app = new App();
app.play();

module.exports = App;
