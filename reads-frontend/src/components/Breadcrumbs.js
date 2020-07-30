import React from 'react'
import { Link } from 'react-router-dom'
const Locations=require('../helpers/location.json')

const Breadcrumbs = ({site}) => {
    let links=[]
    let location=Locations.find(l=>l.name===site)
    
    while(location) {
        const par=location.parent
        location=Locations.find(l=>l.name===par)
        if(location) links.push(location)
    }

    const createLinks=()=> {
        return links.reverse().map(l => {
            return <Link className='breadcrumb-link' to={l.location}>{`${l.name} >>`}</Link>
        })
    }

    return(
        <div>
            {createLinks()} {site}
        </div>
    )
}

export default Breadcrumbs