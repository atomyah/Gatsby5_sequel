import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

// GraphQLクエリで取得した各フィールドにはエイリアスが付けられる.
// 例：title を 「defaultTitle: title」とすればtitleのエイリアス、
// defaultTitleができあがり、以後、defaultTitleで参照できる.
function Seo({ description, title, image, children }) {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `
  )
  // console.log(pathname) // pathnameには/about/が格納される（両端にスラッシュあり）.
  
  // gatsby-config.jsからGraphQLクエリで取得した各siteMetadataの項目を変数定義する.
  // <Seo />のようにプロパティ値ナシで表示されるデフォルトの値なので、いくつかの変数はdefault接頭詞を付けた.
  // 例えばtitleやdescriptionはページ毎にカスタマイズする項目であろうから（例：<Seo title="会社概要" />）
  // そういったsiteMetadataのデフォルト値を使わず、プロパティで値を渡す項目については.
  // プロパティで渡された値があれば、siteMetadataのデフォルト値よりもそちらを優先する、という風にしたのが
  // 下記のconst seo = {}オブジェクトである.
  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

  // 上記各siteMetadata項目の変数をJSONオブジェクトseoにする.
  // 各ページからプロパティで値を渡されたならばそれを優先して表示し、なければ
  // デフォルト値であるgatsby-config.jsから取得したsiteMetadata値を各項目の値とする.
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: staticOrDynamic(siteUrl + image) || defaultImage,
    url: `${siteUrl}${pathname}`, // ${siteUrl}${pathname}でhttps://example.site/about とかになる.
    twitterUsername
  }
  
  // 「image: `${siteUrl}${image || defaultImage}`」だとmicroCMSのAPI記事の場合,下記のような文字列を出力してしまう.
  // https://yah-space.workhttps://images.microcms-assets.io/assets/99e576888709438da1cf9c9908e68aac/b288334b286b43d287c5b31c813bf85d/info05Image.png
  // siteUrlは「https://yah-space.work」でimageにはすなわちmicroCMSへアップロードした画像のフルパスを出力してしまうからである.
  // したがって下記のように、静的ページかmicroCMSからフェッチした動的生成ページかでimageの値を区別しreturnする関数を作成した.
  function staticOrDynamic(imgPath) {
    const str = imgPath
    if (str.match(/microcms/)) {
      let array = str.split(/https:\/\//);
        // console.log('■arrayは', array)
        // console.log('■imageパス最終形 ' + 'https://' + array[2])
      return 'https://' + array[2]
    } else {
      // console.log('◆strは'+ str)
      return str;
    }
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {children}
    </>
  )
}

export default Seo
