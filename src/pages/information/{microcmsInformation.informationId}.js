import * as React from "react"
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const InformationPost  = ({params, data}) => (
    <Layout>
        <div className="page-container">
            {/* 
            <p>params:{JSON.stringify(params)}</p>
            <pre>data:{JSON.stringify(data, null, 2)}</pre>
            */}

            <div className="page-title">
                <h1>{data.microcmsInformation.title}</h1>
            </div>
            <table className="about-table">
              <tr>
                <th>
                    {data.microcmsInformation.date}
                </th>
              </tr>
              <tr>
                <td>
                <div 
                dangerouslySetInnerHTML={{ __html: data.microcmsInformation.body }} />
                </td>
              </tr>
              <tr>
                <td style={{textAlign: `right`}}>
                    著者：{data.microcmsInformation.author.name}
                </td>
              </tr>
            </table>
     
        </div>
    </Layout>
)

export default InformationPost

export const Head = ({data}) => (
        <Seo title={data.microcmsInformation.title}
              description={data.microcmsInformation.exerpt}
              image={data.microcmsInformation.ogpImage.url} />
)

export const query = graphql`
  query($id: String!) {
    microcmsInformation(id: {eq: $id}) {
        informationId
        body
        title
        date(formatString: "YYYY年MM月DD日")
        author {
          name
        }
        exerpt
        ogpImage {
          url
        }
      }
  }
`