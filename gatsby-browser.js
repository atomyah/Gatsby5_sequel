//グローバルスタイルシートを設定
import './src/styles/global.css';


// コンテキストフックSearchContext設定用コード
import React from "react"
import { SearchContext, SearchContextProvider, useSearchContext } from "./src/context/SearchContext"

export const wrapRootElement = ({ element }) => (
  <SearchContextProvider>{element}</SearchContextProvider>
)



//ナビゲーションバー操作のJavaScript(Script APIを使用しない場合に必要)
  export const onRouteUpdate = ({ location }) => {
      const burger = document.querySelector(".burger");
      const nav = document.querySelector(".nav-links");
      const navLinks = document.querySelectorAll(".nav-links li");
    
      burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
    
        navLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = "";
          } else {
            link.style.animation = `navLinksFade 0.5s ease forwards ${
              index / 7 + 0.4
            }s`;
          }
        });
        burger.classList.toggle("toggle");
      });
  };



