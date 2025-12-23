// Link click tracking
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

/*// Form submit tracking
const form = document.getElementById("message-form");

form.addEventListener("submit", () => {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    event: "form_submit",
    form_name: "message_form"
  });
});*/

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

// Cookie notice control
const cookieNotice = document.getElementById("cookie-notice");
const cookieClose = document.getElementById("cookie-close");

if (localStorage.getItem("cookieNoticeClosed")) {
  cookieNotice.style.display = "none";
}

cookieClose.addEventListener("click", () => {
  cookieNotice.style.display = "none";
  localStorage.setItem("cookieNoticeClosed", "true");
});
