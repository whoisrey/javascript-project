class VendingMachineEvents {
  constructor() {
    const vMachine = document.querySelector(".section1");
    this.balance = vMachine.querySelector(".bg-box p");
    this.itemList = vMachine.querySelector(".cola-list");
    this.inputCostEl = vMachine.querySelector("#input-money");
    this.btnPut = vMachine.querySelector("#input-money+.btn");
    this.btnReturn = vMachine.querySelector(".bg-box+.btn");
    this.btnGet = vMachine.querySelector(".btn-get");
    this.stagedList = vMachine.querySelector(".get-list");

    const myinfo = document.querySelector(".section2");
    this.myMoney = myinfo.querySelector(".bg-box strong");

    const getInfo = document.querySelector(".section3");
    this.getList = getInfo.querySelector(".get-list");
    this.txtTotal = getInfo.querySelector(".total-price");
  }

  stagedItemGenerator(target) {
    const stagedItem = document.createElement("li");

    stagedItem.innerHTML = `
      <img src="./img/${target.dataset.img}" alt="">
          ${target.dataset.item}
      <strong>1
          <span class="a11y-hidden">개</span>
      </strong>
      `;
    this.stagedList.append(stagedItem);
  }

  bindEvent() {
    this.btnPut.addEventListener("click", () => {
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      if (inputCost) {
        if (inputCost <= myMoneyVal && inputCost > 0) {
          this.myMoney.textContent = `${new Intl.NumberFormat().format(
            myMoneyVal - inputCost
          )}원`;

          this.balance.textContent = `${new Intl.NumberFormat().format(
            (balanceVal ? balanceVal : 0) + inputCost
          )}원`;
        } else {
          alert("소지금이 부족합니다.");
        }

        this.inputCostEl.value = "";
      }
    });

    this.btnReturn.addEventListener("click", () => {
      const balanceVal = Number.parseInt(
        this.balance.textContent.replaceAll(",", "")
      );
      const myMoneyVal = Number.parseInt(
        this.myMoney.textContent.replaceAll(",", "")
      );

      if (balanceVal) {
        this.myMoney.textContent = `${new Intl.NumberFormat().format(
          balanceVal + myMoneyVal
        )}원`;
        this.balance.textContent = null;
      }
    });

    this.btnsCola = document.querySelectorAll(".section1 .btn-cola");

    this.btnsCola.forEach((item) => {
      item.addEventListener("click", (event) => {
        const balanceVal = Number.parseInt(
          this.balance.textContent.replaceAll(",", "")
        );
        const targetElPrice = Number.parseInt(
          event.currentTarget.dataset.price
        );

        if (balanceVal >= targetElPrice) {
          this.balance.textContent = `${new Intl.NumberFormat().format(
            balanceVal - targetElPrice
          )}원`;

          this.stagedItemGenerator(event.currentTarget);
        } else {
          alert("입금한 금액이 부족합니다.");
        }
      });
    });
  }
}

export default VendingMachineEvents;
