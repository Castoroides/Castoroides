// -------- Link click tracking --------
document.querySelectorAll(".link").forEach(link => {
  link.addEventListener("click", () => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "link_click",
      link_text: link.innerText,
      link_url: link.href
    });
  });
});

// -------- Form submit tracking --------
const onClickSubmit = () => {
  // 入力check
  const message = document.getElementById('message').value.trim();
  if (message === '') {
    onClickSubmit.preventDefault(); // 送信を止める
    alert('空白です');
  }
  
  document.qform.submit();
  //$("#form").submit();
}

// -------- Cookie notice control --------
const cookieNotice = document.getElementById("cookie-notice");
const cookieClose = document.getElementById("cookie-close");

if (localStorage.getItem("cookieNoticeClosed")) {
  cookieNotice.style.display = "none";
}

cookieClose.addEventListener("click", () => {
  cookieNotice.style.display = "none";
  localStorage.setItem("cookieNoticeClosed", "true");
});

// -------- Q&A読み込み --------
/**
 * JSONP コールバック
 * ★ 必ず先に定義する
 */
window.handleData = function (data) {
  console.log("handleData called:", data);

  const list = document.getElementById("list");
  list.innerHTML = "";

  if (!data || data.length === 0) {
    list.textContent = "表示するデータがありません";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-date">${item["送信日"] || ""}</div>

      <div class="row">
        <span class="label">メッセージ</span>
        <span class="value">${item["メッセージ"] || ""}</span>
      </div>

      <div class="row">
        <span class="label">回答</span>
        <span class="value">${item["回答"] || "（未回答）"}</span>
      </div>
    `;

    list.appendChild(card);
  });
};
</script>

<script>
/**
 * JSONP 読み込み
 * ★ handleData 定義「後」
 */
(function () {
  const script = document.createElement("script");
  script.src =
    "https://script.google.com/macros/s/AKfycbzOOlRFJfIv32aeWsGY3DztW4ScwPX7a4mIY9wwCRdLN87EcqPJCwtS1b5k9t9QyL7G/exec"
    + "?callback=handleData";

  script.onerror = () => {
    console.error("GAS JSONP load failed");
    document.getElementById("list").textContent = "データの読み込みに失敗しました";
  };

  document.body.appendChild(script);
})();
</script>
