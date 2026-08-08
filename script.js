// =====================
// 設定
// =====================

// ここを好きな4桁に変更できる
const CORRECT_PASSCODE = "4827";

let enteredCode = "";


// =====================
// ロック画面 → パスコード
// =====================

const lockScreen = document.getElementById("lockScreen");

let startY = 0;

lockScreen.addEventListener("touchstart", function(e) {
  startY = e.touches[0].clientY;
});

lockScreen.addEventListener("touchend", function(e) {

  const endY = e.changedTouches[0].clientY;

  // 上方向にスワイプ
  if (startY - endY > 50) {
    showPasscode();
  }

});

function showPasscode() {

  document.getElementById("lockScreen")
    .classList.add("hidden");

  document.getElementById("passcodeScreen")
    .classList.remove("hidden");

}


// =====================
// パスコード
// =====================

function pressKey(number) {

  if (enteredCode.length >= 4) return;

  enteredCode += number;

  updateDots();

  if (enteredCode.length === 4) {

    setTimeout(checkPasscode, 200);

  }

}


function deleteKey() {

  enteredCode = enteredCode.slice(0, -1);

  updateDots();

}


function updateDots() {

  const dots = document.querySelectorAll(".dots span");

  dots.forEach((dot, index) => {

    if (index < enteredCode.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }

  });

}


function checkPasscode() {

  if (enteredCode === CORRECT_PASSCODE) {

    document.getElementById("passcodeScreen")
      .classList.add("hidden");

    document.getElementById("homeScreen")
      .classList.remove("hidden");

    enteredCode = "";

    updateDots();

  } else {

    document.getElementById("errorMessage")
      .textContent = "パスコードが違います";

    setTimeout(() => {

      enteredCode = "";

      updateDots();

      document.getElementById("errorMessage")
        .textContent = "";

    }, 700);

  }

}


function backToLock() {

  document.getElementById("passcodeScreen")
    .classList.add("hidden");

  document.getElementById("lockScreen")
    .classList.remove("hidden");

  enteredCode = "";

  updateDots();

}


// =====================
// アプリ
// =====================

function openApp(app) {

  document.getElementById("homeScreen")
    .classList.add("hidden");

  document.getElementById("appScreen")
    .classList.remove("hidden");

  const title = document.getElementById("appTitle");
  const content = document.getElementById("appContent");


  // メッセージ
  if (app === "messages") {

    title.textContent = "メッセージ";

    content.innerHTML = `

      <div class="message">

        <div class="message-name">
          ゆうき
        </div>

        <div class="message-bubble">
          この前の車の件、どうする？
        </div>

      </div>


      <div class="message">

        <div class="message-name">
          わたる
        </div>

        <div class="message-bubble">
          その話は誰にも言わないで。
        </div>

      </div>

    `;

  }


  // 写真
  if (app === "photos") {

    title.textContent = "写真";

    content.innerHTML = `

      <div class="fake-photo">
        🚗
      </div>

      <p>
        8月7日　18:42
      </p>

    `;

  }


  // メモ
  if (app === "memo") {

    title.textContent = "メモ";

    content.innerHTML = `

      <div class="memo">

        <strong>8月7日</strong><br><br>

        車を使う。<br>
        ↓<br>
        18:30　駐車場<br>
        ↓<br>
        19:10　帰宅

      </div>

    `;

  }


  // 通話履歴
  if (app === "calls") {

    title.textContent = "通話履歴";

    content.innerHTML = `

      <p>📞 ゆうき　18:31</p>
      <p>📞 りんたろう　18:54</p>

    `;

  }


  // マップ
  if (app === "map") {

    title.textContent = "マップ";

    content.innerHTML = `

      <div class="fake-photo">
        🗺️
      </div>

      <p>
        最後に確認された場所
      </p>

    `;

  }

}


function backHome() {

  document.getElementById("appScreen")
    .classList.add("hidden");

  document.getElementById("homeScreen")
    .classList.remove("hidden");

}
