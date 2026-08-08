// =====================
// 設定
// =====================

// 4桁のパスコード
const CORRECT_PASSCODE = "4827";

let enteredCode = "";



// =====================
// ロック画面
// =====================

const lockScreen =
  document.getElementById("lockScreen");

let startY = 0;


// 指を置いたとき
lockScreen.addEventListener(
  "touchstart",
  function(e) {

    startY =
      e.touches[0].clientY;

  },
  { passive: true }
);


// 指を離したとき
lockScreen.addEventListener(
  "touchend",
  function(e) {

    const endY =
      e.changedTouches[0].clientY;

    // 上に50px以上スワイプ
    if (startY - endY > 50) {

      showPasscode();

    }

  },
  { passive: true }
);



// =====================
// パスコード画面を表示
// =====================

function showPasscode() {

  document
    .getElementById("lockScreen")
    .classList.add("hidden");


  document
    .getElementById("passcodeScreen")
    .classList.remove("hidden");

}



// =====================
// パスコード
// =====================

function pressKey(number) {

  if (enteredCode.length >= 4) {
    return;
  }


  enteredCode += number;

  updateDots();


  if (enteredCode.length === 4) {

    setTimeout(
      checkPasscode,
      200
    );

  }

}



function deleteKey() {

  enteredCode =
    enteredCode.slice(0, -1);

  updateDots();

}



function updateDots() {

  const dots =
    document.querySelectorAll(
      ".dots span"
    );


  dots.forEach(
    (dot, index) => {

      if (
        index <
        enteredCode.length
      ) {

        dot.classList.add(
          "filled"
        );

      } else {

        dot.classList.remove(
          "filled"
        );

      }

    }
  );

}



function checkPasscode() {

  if (
    enteredCode ===
    CORRECT_PASSCODE
  ) {


    document
      .getElementById(
        "passcodeScreen"
      )
      .classList.add("hidden");


    document
      .getElementById(
        "homeScreen"
      )
      .classList.remove("hidden");


    enteredCode = "";

    updateDots();


  } else {


    document
      .getElementById(
        "errorMessage"
      )
      .textContent =
      "パスコードが違います";


    setTimeout(
      function() {

        enteredCode = "";

        updateDots();


        document
          .getElementById(
            "errorMessage"
          )
          .textContent = "";

      },
      700
    );

  }

}



// パスコード画面から
// ロック画面に戻る

function backToLock() {

  document
    .getElementById(
      "passcodeScreen"
    )
    .classList.add("hidden");


  document
    .getElementById(
      "lockScreen"
    )
    .classList.remove("hidden");


  enteredCode = "";

  updateDots();

}



// =====================
// アプリを開く
// =====================

function openApp(app) {

  document
    .getElementById(
      "homeScreen"
    )
    .classList.add("hidden");


  document
    .getElementById(
      "appScreen"
    )
    .classList.remove("hidden");


  const title =
    document.getElementById(
      "appTitle"
    );


  const content =
    document.getElementById(
      "appContent"
    );



  // =====================
  // メッセージ
  // =====================

  if (app === "messages") {

    title.textContent =
      "メッセージ";


    content.innerHTML = `

      <div
        class="conversation"
        onclick="
          openConversation('りんたろう')
        "
      >

        <div class="conversation-icon">
          👤
        </div>


        <div class="conversation-info">

          <div class="conversation-name">
            りんたろう
          </div>

          <div class="conversation-preview">
            またあの件なんだけど…
          </div>

        </div>


        <div class="conversation-time">
          18:42
        </div>

      </div>



      <div
        class="conversation"
        onclick="
          openConversation('ゆうき')
        "
      >

        <div class="conversation-icon">
          👤
        </div>


        <div class="conversation-info">

          <div class="conversation-name">
            ゆうき
          </div>

          <div class="conversation-preview">
            車のこと、知ってる？
          </div>

        </div>


        <div class="conversation-time">
          17:15
        </div>

      </div>



      <div
        class="conversation"
        onclick="
          openConversation('かなと')
        "
      >

        <div class="conversation-icon">
          👤
        </div>


        <div class="conversation-info">

          <div class="conversation-name">
            かなと
          </div>

          <div class="conversation-preview">
            明日の予定どうする？
          </div>

        </div>


        <div class="conversation-time">
          昨日
        </div>

      </div>

    `;

  }



  // =====================
  // 写真
  // =====================

  if (app === "photos") {

    title.textContent =
      "写真";


    content.innerHTML = `

      <div class="fake-photo">
        🚗
      </div>

      <p>
        8月7日　18:42
      </p>

    `;

  }



  // =====================
  // メモ
  // =====================

  if (app === "memo") {

    title.textContent =
      "メモ";


    content.innerHTML = `

      <div class="memo">

        <strong>
          8月7日
        </strong>

        <br><br>

        車を使う。<br>

        ↓<br>

        18:30　駐車場<br>

        ↓<br>

        19:10　帰宅

      </div>

    `;

  }



  // =====================
  // 通話履歴
  // =====================

  if (app === "calls") {

    title.textContent =
      "通話履歴";


    content.innerHTML = `

      <p>
        📞 ゆうき　18:31
      </p>

      <p>
        📞 りんたろう　18:54
      </p>

    `;

  }



  // =====================
  // マップ
  // =====================

  if (app === "map") {

    title.textContent =
      "マップ";


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



// =====================
// 個人のメッセージ
// =====================

function openConversation(person) {

  const title =
    document.getElementById(
      "appTitle"
    );


  const content =
    document.getElementById(
      "appContent"
    );


  title.textContent =
    person;



  // =====================
  // りんたろう
  // =====================

  if (
    person === "りんたろう"
  ) {

    content.innerHTML = `

      <div class="chat-date">
        8月7日
      </div>


      <div class="message received">

  <div class="message-name">
    りんたろう
  </div>

  <div class="message-row">

    <div class="message-bubble">
      あの車の件なんだけど、<br>
      誰にも言ってないよ。
    </div>

    <div class="message-time">
      18:42
    </div>

  </div>

</div>


      <div class="message sent">

  <div class="message-row">

    <div class="message-time">
      18:45
    </div>

    <div class="message-bubble">
      本当に？
    </div>

  </div>

</div>


      <div class="message received">

        <div class="message-name">
          りんたろう
        </div>

        <div class="message-bubble">
          大丈夫。俺に任せて。
        </div>

      </div>

    `;

  }



  // =====================
  // ゆうき
  // =====================

  if (
    person === "ゆうき"
  ) {

    content.innerHTML = `

      <div class="chat-date">
        8月7日
      </div>


      <div class="message received">

        <div class="message-name">
          ゆうき
        </div>

        <div class="message-bubble">
          車のこと、知ってる？
        </div>

      </div>


      <div class="message sent">

        <div class="message-bubble">
          何のこと？
        </div>

      </div>


      <div class="message received">

        <div class="message-name">
          ゆうき
        </div>

        <div class="message-bubble">
          昨日、駐車場で見た。
        </div>

      </div>

    `;

  }



  // =====================
  // かなと
  // =====================

  if (
    person === "かなと"
  ) {

    content.innerHTML = `

      <div class="chat-date">
        8月6日
      </div>


      <div class="message received">

        <div class="message-name">
          かなと
        </div>

        <div class="message-bubble">
          明日の予定どうする？
        </div>

      </div>


      <div class="message sent">

        <div class="message-bubble">
          いつも通りで大丈夫！
        </div>

      </div>

    `;

  }

}



// =====================
// 個人トーク
// → メッセージ一覧
// =====================

function backToMessages() {

  const title =
    document.getElementById(
      "appTitle"
    );


  const content =
    document.getElementById(
      "appContent"
    );


  title.textContent =
    "メッセージ";


  content.innerHTML = `

    <div
      class="conversation"
      onclick="
        openConversation('りんたろう')
      "
    >

      <div class="conversation-icon">
        👤
      </div>


      <div class="conversation-info">

        <div class="conversation-name">
          りんたろう
        </div>

        <div class="conversation-preview">
          またあの件なんだけど…
        </div>

      </div>


      <div class="conversation-time">
        18:42
      </div>

    </div>



    <div
      class="conversation"
      onclick="
        openConversation('ゆうき')
      "
    >

      <div class="conversation-icon">
        👤
      </div>


      <div class="conversation-info">

        <div class="conversation-name">
          ゆうき
        </div>

        <div class="conversation-preview">
          車のこと、知ってる？
        </div>

      </div>


      <div class="conversation-time">
        17:15
      </div>

    </div>



    <div
      class="conversation"
      onclick="
        openConversation('かなと')
      "
    >

      <div class="conversation-icon">
        👤
      </div>


      <div class="conversation-info">

        <div class="conversation-name">
          かなと
        </div>

        <div class="conversation-preview">
          明日の予定どうする？
        </div>

      </div>


      <div class="conversation-time">
        昨日
      </div>

    </div>

  `;

}



// =====================
// ホームに戻る
// =====================

function backHome() {

  document
    .getElementById(
      "appScreen"
    )
    .classList.add("hidden");


  document
    .getElementById(
      "homeScreen"
    )
    .classList.remove("hidden");

}
