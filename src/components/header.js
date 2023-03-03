import * as React from "react"
import axios from "axios";
import { Link, navigate } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Script } from "gatsby"
import { useSearchContext } from '../context/SearchContext'

const Header = ({ siteTitle }) => {
  const [keyword, setKeyword] = React.useState("");

    // useSearchContextを使用してステート変数をセット.
    // ステート変数がinfos一つしかなければ以下の書き方でよい.
    // const { infos, setInfos } = useSearchContext([])
    
    const { infos, action } = useSearchContext([])
    const [infosValue, setinfosValue] = infos;
    const [actionValue, setactionValue] = action;


  const searchInfos = async () => {
    // 検索APIにリクエストを送信
    const res = await axios.get("/api/search", {
      params: {
        keyword,
      },
    });

    // 検索結果をステート変数にセット
    setinfosValue(res.data.contents);

    // 検索を実行した場合actionフラッグをtrueに
    setactionValue(true)
    //console.log(res.data.contents)

    navigate('/searchresultPage');
  };

  return (
  <>
    <nav>
        <Link to="/">
          <figure className="logo">
              <StaticImage
                  src="../images/logo_small.png"
                  width={80}
                  alt="トップ画像"
                  placeholder="blurred"
              />
          </figure>
        </Link>

      <ul className="nav-links">
        <li><Link to="/about">会社概要</Link></li>
        <li><Link to="/jigyou">事業内容</Link></li>
        <li><Link to="/information">インフォメーション</Link></li>
        <li><Link to="/contact">お問い合わせ</Link></li>
      </ul>

      <div method="post" action="#" className="search_container"   
            >
            <input type="text" size="25" placeholder="例：人事情報" 
                   value={keyword}
                   onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit"
                    onClick={searchInfos}
                    disabled={!keyword}            
                    >
                    検索</button>
      </div>

      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>

    {/* JavaScriptを埋め込み。
        本来はgatsby-browser.jsにonRouteUpdateとして書く。
        しかし新機能Script API.によりページに埋め込むことができるようになった。
      　※本番サイトアップ時に下記URLを変更する必要アリ
    <Script src="http://localhost:8000/script.js" />
    */}
    
  </>
  )
}

export default Header

