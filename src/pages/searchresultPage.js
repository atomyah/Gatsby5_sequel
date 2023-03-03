import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SearchResult from "../components/searchresult"

const SearchResultPage = () => (
    <Layout>
        <div className="page-container">

            <div className="page-title">
                <h1>検索ページ</h1>
            </div>

            {/* 検索結果コンポーネント埋め込み */}
            <SearchResult />

        </div>
    </Layout>
)

export default SearchResultPage
