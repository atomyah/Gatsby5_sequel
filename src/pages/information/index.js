import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

/* FontAwesomeIconインポート用コード */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLink, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
/* FontAwesomeIconインポート用コード ここまで */

const InformationPage = ({ data }) => (
    <Layout>
      <div className="page-container">
        <div className="page-title">
            <h1>インフォメーション</h1>
        </div>

        {data.allMicrocmsInformation.edges.map(({ node }) => 
          <div className="info-card"> 
            <span>{node.date}{` `}</span>
            <span style={{fontWeight: `300`, fontSize: `0.9em`, background: `#FFFFCC`}}>{node.category.category}</span>
            <h3 className="info-title">
                <FontAwesomeIcon icon={faExternalLink} />{` `}{node.title}
            </h3>
            <p className="info-content">
              {node.exerpt}
            </p>
            <Link to={node.informationId} className="info-link">
              <FontAwesomeIcon icon={faArrowRight} />{` `}詳細はこちら
            </Link>
          </div>
        )}

      </div>        
    </Layout>
)

export const Head = () => <Seo title="インフォメーション一覧" 
                               description="ヤー・スペーステック社のインフォメーション一覧ページになります"
                               image="/ogpImage/informationImg.png" />

export default InformationPage

export const query = graphql`
query {
    allMicrocmsInformation (sort: {fields: [date], order: DESC}) {
      edges {
        node {
          body
          category {
            category
          }
          date(formatString: "YYYY年MM月DD日")
          informationId
          title
          exerpt
        }
      }
    }
  }
`