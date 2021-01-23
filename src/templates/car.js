import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { Wrapper, Image } from './templateStyles/artistStyles'

const CarTemplate = ({ data: { wpcontent: { car: { car, types: { edges: types } } } } }) => {
    const  {picture1, picture2, picture3} = car.pictures
    const pictures = [picture1, picture2, picture3]
    return (
        <Layout>
            <SEO title="Car"/>
            <Wrapper>
                <div className="artist-container">
                    <div className="artist-image">
                        <Image fluid={car.profile.imageFile.childImageSharp.fluid} alt={car.profile.altText}/>
                        <div className="roles">
                            {types.map(({node: type}) => (
                                <div key={type.name} className="role">{type.name}</div>
                            ))}
                        </div>
                    </div>
                    <div className="artist-info">
                        <h2>{car.brand} {car.name}</h2>
                        <p className="description">{car.description}</p>
                        <p className="info"><strong>Price: </strong>€ {car.price}</p>
                        <p className="info"><strong>Model Year: </strong>{car.modelYear}</p>
                    </div>
                </div>
                <div className="artist-pictures">
                    {pictures.map((picture, i) =>{
                        return(
                            <div key={i} className="artist-picture">
                                <Image fluid={picture.imageFile.childImageSharp.fluid} alt={picture.altText}/>
                            </div>
                        )
                    })}
                </div>
            </Wrapper>
        </Layout>
    )
}

export default CarTemplate

export const pageQuery = graphql`
query ($id: ID!) {
  wpcontent {
    car(id: $id, idType: ID) {
      id
      types {
        edges {
          node {
            name
          }
        }
      }
      car {
        brand
        description
        modelYear
        name
        price
        profile {
          altText
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality: 75){
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        pictures {
          picture1 {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          picture2 {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          picture3 {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75){
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
`