import React from 'react'
import { Link } from 'react-router-dom'
const Locations=require('../helpers/location.json')

const Breadcrumbs = ({site}) => {
    console.log('sijainnit', Locations)
    let links=[]
    let location=Locations.find(l=>l.name===site)
    
    while(location) {
        console.log('loop', location.name)
        const par=location.parent
        location=Locations.find(l=>l.name===par)
        console.log('found', location)
        if(location) links.push(location)
    }

    const createLinks=()=> {
        console.log('links', links)
        return links.reverse().map(l => {
            console.log('l', l)
            return <Link to={l.location}>{`${l.name} >>`}</Link>
        })
    }

    return(
        <div>Leivät
            {createLinks()} {site}
        </div>
    )
}

export default Breadcrumbs