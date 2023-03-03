import * as React from "react"
import { Link, graphql } from "gatsby"
import { useSearchContext, SearchContextProvider} from '../context/SearchContext'

const SearchResult = () => {
    const { infos, action } = useSearchContext([])
    const [infosValue, setinfosValue] = infos;
    const [actionValue, setactionValue] = action;

    return (
        <SearchContextProvider>          
               {((infosValue.length > 0 && actionValue == true) || (actionValue == false)) ? 
                infosValue.map((infoValue) => (
                    <div>
                    <section>             
                        <div className="info-card">
                            <Link to={`/information/${infoValue.id}`}>                         
                                <h1 className="info-title">{infoValue.title}</h1>
                            </Link>
                            <p>{(infoValue.date).substring(0,10)}</p>
                            <p className="info-content">{infoValue.exerpt}</p>
                        </div>
                    </section>
                </div>
            )) : (<p>検索結果はありませんでした</p>)
            }
        </SearchContextProvider>
    )
}

export default SearchResult
