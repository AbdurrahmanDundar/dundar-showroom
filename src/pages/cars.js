import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, BottomEdgeDown, Artist, BottomEdgeUp } from "../pages/pageStyles/pageStyles"
import { COLORS } from "../constants"

const CarsPage = () => {
    const { wpcontent: {
        page: {
            carsPageMeta: {
                carsPageDescription,
                carsPageHeaderPicture
            }
        },
        cars: {
            edges: cars
        }
    } } = useStaticQuery(graphql`
    query{
        wpcontent {
          page(id: "cars", idType: URI) {
            carsPageMeta {
              carsPageDescription
              carsPageHeaderPicture {
                sourceUrl
                imageFile{
                 childImageSharp{
                    fluid(quality: 100){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
                altText
              }
            }
          }
          cars {
            edges {
              node {
                car {
                  brand
                  description
                  modelYear
                  name
                  profile{
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
                }
                slug
              }
            }
          }
        }
      }
    `)
    return (
        <Layout>
            <SEO title="Cars" />
            <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
                <div className="banner">
                    <Image fluid={carsPageHeaderPicture.imageFile.childImageSharp.fluid} alt={carsPageHeaderPicture.altText} />
                    <BottomEdgeDown color={COLORS.SECONDARY} />
                </div>
                <div className="description">
                    <h2>We are Dündar Showroom</h2>
                    <p>{carsPageDescription}</p>
                    <BottomEdgeUp color={COLORS.BLACK} />
                </div>
                <div className="artists">
                    <h2>Our Cars</h2>
                    <div className="artist-items">
                        {cars.map(({ node: { car, slug } }) => (
                            <Artist to={`/${slug}`}>
                                <Image fluid={car.profile.imageFile.childImageSharp.fluid} alt={car.profile.altText} />
                                <div className="artist-info">
                                    <p>
                                        {car.brand} {car.name}
                                    </p>
                                    <p>
                                        {car.modelYear}
                                    </p>
                                </div>
                            </Artist>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </Layout>
    )
}

export default CarsPage
