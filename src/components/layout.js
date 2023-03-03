import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import  Header from "./header"
import  Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout