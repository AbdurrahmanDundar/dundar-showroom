import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, Artist, BottomEdgeDown, BottomEdgeUp } from "../pages/pageStyles/pageStyles"
import { COLORS } from "../constants"


const IndexPage = () => {
  const { wpcontent: {
    page: {
      homePageMeta: {
        homePageDescription,
        homePageFeaturedCars,
        homePageHeaderDescription,
        homePageHeaderPicture,
        homePageHeaderTitle
      }
    }
  } } = useStaticQuery(graphql`
  query{
    wpcontent{
    page(id: "home", idType: URI) {
      homePageMeta {
        homePageDescription
        homePageHeaderDescription
        homePageHeaderTitle
        homePageHeaderPicture {
          altText
          sourceUrl
          imageFile {
            childImageSharp{
              fluid(quality: 50){
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        homePageFeaturedCars{
          ...on WPGraphql_Car{
            id 
            car{
              brand
              name
              description
              modelYear
              profile{
                altText
                sourceUrl
                imageFile {
                  childImageSharp{
                    fluid(quality: 50, grayscale: true){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`)
console.log(homePageFeaturedCars)
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} alt={homePageHeaderPicture.altText}/>
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageHeaderDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="artists">
          <h2>Featured Cars</h2>
          <div className="artist-items">
            {homePageFeaturedCars.map(({ car, slug }) => (
              <Artist key={slug} to={`/${slug}`}>
                <Image fluid={car.profile.imageFile.childImageSharp.fluid} alt={car.profile.altText} />
                <div className="artist-info">
                  <p>{car.brand} {car.name}</p>
                  <p>{car.modelYear}</p>
                </div>
              </Artist>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
