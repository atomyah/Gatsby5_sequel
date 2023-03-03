require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `ヤー・スペーステックWebサイト`,
    description: `デブリ除去から量子コントロールまで。宇宙テクノロジーの最先端からどぶさらいまでお任せ下さい`,
    author: `ヤー・スペーステック広報部`,
    siteUrl: `https://yah-space.work`,
    image: `/ogpImage/defaultImg.png`,
    twitterUsername: `@yah-space-work`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // 「4.1.2 gatsby-config.jsの編集」で追加するmicroCMS用の設定
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICROCMS_APIKEY,
        serviceId: 'yah-space-work',
        apis: [{
          endpoint: 'information',
        }],
      },
    }
    // microCMS用の設定 ここまで    
  ],
}
