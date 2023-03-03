import * as React from "react"
import axios from "axios";
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

export default function SearchForm() {
    const [keyword, setKeyword] = React.useState("");
    const [infos, setInfos] = React.useState([]);
    const [action, setAction] = React.useState(false)
  
    const searchInfos = async () => {
      // 検索APIにリクエストを送信
      const res = await axios.get("/api/search", {
        params: {
          keyword,
        },
      });
      // 検索結果をステート変数にセット
      setInfos(res.data.contents);
      // console.log(res.data.contents)

      // 検索を実行した場合actionフラッグをtrueに
      setAction(true)
    };
  
    return (
      <Layout>
          <div className="page-container">

          <div className="page-title">
            <h1>検索ページ</h1>
          </div>

            <div className="Form">
                <div className="Form-Item">
                    <p className="Form-Item-Label"><span className="Form-Item-Label-Required">検索</span>検索ワードを入力➞</p>
                    <input type="text" className="Form-Item-Input" placeholder="例）ナフタレン"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            />
                </div>
                <div className="Form-Item">
                    <p className="Form-Item-Label"></p>
                    <button type="submit" className="Form-Btn"
                            onClick={searchInfos}
                            disabled={!keyword}
                            >
                            検索する</button>
                </div>    
            </div>


            {/* 検索結果ブロック */}          
            {((infos.length > 0 && action == true) || (action == false)) ? 
                infos.map((info) => (
                <div>
                    <section>             
                        <div className="info-card">
                            <Link to={`/information/${info.id}`}>                         
                                <h1 className="info-title">{info.title}</h1>
                            </Link>
                            <p>{(info.date).substring(0,10)}</p>
                            <p className="info-content">{info.exerpt}</p>
                        </div>
                    </section>
                </div>
            )) : (<p>検索結果はありませんでした</p>)
           }
     
        </div>
      </Layout>
    );
}
