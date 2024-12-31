<template>
  <el-main>
    <router-link :to="'/layout'"><H1>LOGIN</H1></router-link>
  </el-main>
</template>

<script setup>
function setCookie() {
  /* 設定 */
  /* path= */
  /* 指定 cookie 適用嘅路徑。如果唔設 path，cookie 只適用於目前頁面所在的路徑。 */
  /* path=/; 代表全域生效。 */

  /* domain= */
  /* 指定 cookie 適用嘅網域，設定後可以擴展到子網域。 */
  
  /* max-age= */
  /* 指定 Cookie 從設定開始計算嘅存活時間，以秒為單位。如果唔設，cookie 變成 Session cookie (關瀏覽器即失效)。 */
  /* 使用秒數表示相對嘅存活時間。 */

  /* HttpOnly */
  /* 無法被 JavaScript 讀取，減低 XSS 攻擊 嘅風險。 */

  /* Secure */
  /* 只允許透過 HTTPS 傳送 cookie，http 通信時唔會傳送。 */

  /* SameSite= */
  /* 控制跨站請求攜帶 cookie 嘅行為，減低 CSRF 攻擊嘅風險。 */
  /* SameSite=Strict：嚴格限制，只能在同網域請求中帶上 */
  /* SameSite=Lax：大部分情況限制跨站，但一般導覽行為（如從一個 domain link 去另一個）仍允許 */
  /* SameSite=None：允許跨站帶 cookie（需要配合 Secure） */

  document.cookie = "token_cookie=HAHAHA; path=/; HttpOnly; SameSite=Strict; max-age=14400"; // 設置 cookie
  const cookies = document.cookie.split(';').map(c => c.trim()); // 讀取同網域 Cookie 陣列
  const tokenCookie = cookies.find(c => c.startsWith('token_cookie=')).split('=')[1]; // 讀取指定 Cookie 內容
}
</script>

<style lang="scss" scoped>
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: var(--LIME);
    text-decoration: none;
  }

  // border: 1px solid gold;
}
</style>