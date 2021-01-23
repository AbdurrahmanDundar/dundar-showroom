import React from 'react'
import {useStaticQuery, graphql, link, Link} from 'gatsby'
import {OverlayWrapper, Image, CloseButton, MenuList} from './headerStyles/headerStyles'

const OverlayMenu = ({handleOverLayMenu, menuOpen}) => {
    const {
        logo,
        wpcontent: { menuItems } } = useStaticQuery(graphql`
  query{
    logo: file(relativePath: {eq: "logo.png"}){
      childImageSharp {
        fixed(quality: 100, width: 200){
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    wpcontent {
      menuItems {
        edges {
          node {
            label
            path
          }
        }
      }
    }
  }`)
    return (
        <>
          {menuOpen &&(
              <OverlayWrapper>
                  <CloseButton onClick={handleOverLayMenu}>X</CloseButton>
                  <Link to="/" style={{marginBottom: "1.5rem"}}>
                      <Image alt="Logo artist agency obi" fixed={logo.childImageSharp.fixed}/>
                  </Link>
                  <MenuList style={{flexDirection: "column"}}>
                      {menuItems.edges.map(({node: item}, i) => {
                          return (<li key={i}>
                              <Link activeClassName="nav-active" to={item.path}>
                                  {item.label}
                              </Link>
                          </li>)
                      })}
                  </MenuList>
              </OverlayWrapper>
          )}  
        </>
    )
}

export default OverlayMenu
