import React from "react"
import queryString from "query-string"

const License = ({match, location, history}) => {
    const queries = queryString.parse(location.search)
    const handleClick = () => history.push("/")
    return (
        <div>
            <h1>License - {match.params.id}</h1>
            <ul>
                <li>{queries.category}</li>
                <li>{queries.type}</li>
            </ul>
            <button onClick={handleClick}>goto Home</button>
        </div>
    )
}
export default License